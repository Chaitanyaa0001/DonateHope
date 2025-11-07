import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model.js";
import MonitorLogs from "../../models/monitorLogs.model.js";
import {
  performMonitorCheck,
  startMonitorJob,
  deleteMonitorLogs,
} from "../../utils/monitorCron.js";
import redis from "../../config/redisClient.js";

const userCacheKey = (userId: string) => `user_monitors_${userId}`;
const adminCacheKey = "admin_all_monitors";

export const postMonitor = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { name, endpoint, method, interval, headers, body } = req.body;

    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!name || !endpoint || !method || !interval)
      return res.status(400).json({
        message: "Name, endpoint, method, and interval are required",
      });

    let parsedHeaders = headers;
    let parsedBody = body;
    try {
      if (typeof headers === "string" && headers.trim() !== "")
        parsedHeaders = JSON.parse(headers);
      if (typeof body === "string" && body.trim() !== "")
        parsedBody = JSON.parse(body);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in headers/body" });
    }

    const monitor = await monitorModel.create({
      user: user._id,
      name,
      endpoint,
      method,
      headers: parsedHeaders || {},
      body: parsedBody || {},
      interval: interval || 5,
    });

    await redis.del([userCacheKey(user._id.toString()), adminCacheKey]).catch(console.error);

    performMonitorCheck(monitor, true)
      .then(() => startMonitorJob(monitor))
      .catch((err) => console.error("Monitor init error:", err));

    return res.status(201).json({ message: "Monitor created successfully", monitor });
  } catch (err) {
    console.error(" Error creating monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMonitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);

    if (!monitor)
      return res.status(404).json({ message: "Monitor not found" });

    await deleteMonitorLogs(id);
    await monitorModel.findByIdAndDelete(id);

    await redis
      .del([userCacheKey(monitor.user.toString()), adminCacheKey])
      .catch(console.error);

    return res
      .status(200)
      .json({ message: "Monitor and logs deleted successfully" });
  } catch (err) {
    console.error("Error deleting monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserMonitors = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({ message: "Unauthorized access" });

    const cacheKey = userCacheKey(user._id.toString());
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({ source: "cache", data: JSON.parse(cachedData) });
    }

    const monitors = await monitorModel
      .find({ user: user._id })
      .populate("user", "email fullname role")
      .sort({ createdAt: -1 });

    await redis.set(cacheKey, JSON.stringify(monitors), "EX", 15);

    return res.status(200).json({ source: "db", data: monitors });
  } catch (err) {
    console.error("Error fetching user monitors:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonitorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel
      .findById(id)
      .populate("user", "email fullname role");

    if (!monitor)
      return res.status(404).json({ message: "Monitor not found" });

    return res.status(200).json({ data: monitor });
  } catch (err) {
    console.error("Error fetching monitor by ID:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserMonitorLogs = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({ message: "Unauthorized" });

    const monitors = await monitorModel.find({ user: user._id }).select("_id");
    const monitorIds = monitors.map((m) => m._id);

    const logs = await MonitorLogs.find({
      monitorId: { $in: monitorIds },
    })
      .sort({ timestamp: 1 })
      .limit(1000);

    const grouped = logs.reduce((acc: any, log) => {
    const hour = new Date(log.timestamp).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",});
      if (!acc[hour]) acc[hour] = { total: 0, count: 0 };
      acc[hour].total += log.responseTime;
      acc[hour].count++;
      return acc;
    }, {});

    const formatted = Object.entries(grouped).map(([time, val]: any) => ({
      time,
      latency: val.total / val.count,
    }));

    return res.status(200).json({ data: formatted });
  } catch (err) {
    console.error(" Error fetching monitor logs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLogsByMonitorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const logs = await MonitorLogs.find({ monitorId: id }).sort({ timestamp: -1 }).limit(1000);

    const formatted = logs.map((log) => ({
      timestamp: log.timestamp,
      responseTime: log.responseTime,
      statusCode: log.statusCode,
      message: log.message,
    }));

    return res.status(200).json({ data: formatted });
  } catch (err) {
    console.error("Error fetching monitor logs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
