import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model";
import monitorLogModel from "../../models/monitorLogs.model";
import {
  performMonitorCheck,
  startMonitorJob,
  deleteMonitorLogs,
} from "../../utils/monitorCron";
import redis from "../../config/redisClient";

// ✅ Create Monitor
export const postMonitor = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { name, endpoint, method, interval, headers, body } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name || !endpoint || !method || !interval) {
      return res.status(400).json({
        message: "Name, endpoint, method, and interval are required",
      });
    }

    let parsedHeaders = headers;
    let parsedBody = body;

    // ✅ Safely parse JSON from frontend or Postman
    try {
      if (typeof headers === "string" && headers.trim() !== "") {
        parsedHeaders = JSON.parse(headers);
      }
      if (typeof body === "string" && body.trim() !== "") {
        parsedBody = JSON.parse(body);
      }
    } catch (err) {
      console.error("❌ Invalid JSON in headers/body:", err);
      return res.status(400).json({
        message: "Invalid JSON format in headers or body. Must be valid JSON.",
      });
    }

    // ✅ Create and save monitor
    const monitor = await monitorModel.create({
      user: user._id,
      name,
      endpoint,
      method,
      headers: parsedHeaders || {},
      body: parsedBody || {},
      interval: interval || 5,
    });

    // ⚡ Perform initial check + AI summary
    await performMonitorCheck(monitor, true);

    // 🕒 Start cron job for recurring checks
    startMonitorJob(monitor);

    return res.status(201).json({
      message: "Monitor created successfully",
      monitor,
    });
  } catch (err) {
    console.error("❌ Error creating monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Monitor
export const deleteMonitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    await deleteMonitorLogs(id);
    await monitorModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Monitor and logs deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all monitors for logged-in user
export const getUserMonitors = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const cacheKey = `user_monitors_${user._id}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res
        .status(200)
        .json({ source: "cache", data: JSON.parse(cachedData) });
    }

    const monitors = await monitorModel
      .find({ user: user._id })
      .populate("user", "email fullname role")
      .sort({ createdAt: -1 });

    await redis.set(cacheKey, JSON.stringify(monitors), "EX", 60);
    return res.status(200).json({ source: "db", data: monitors });
  } catch (err) {
    console.error("❌ Error fetching user monitors:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get monitor by ID
export const getMonitorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel
      .findById(id)
      .populate("user", "email fullname role");

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    return res.status(200).json({ data: monitor });
  } catch (err) {
    console.error("❌ Error fetching monitor by ID:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get user monitor logs for chart
export const getUserMonitorLogs = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const monitors = await monitorModel.find({ user: user._id }).select("_id");
    const monitorIds = monitors.map((m) => m._id);

    const logs = await monitorLogModel
      .find({ monitorId: { $in: monitorIds } })
      .sort({ timestamp: 1 })
      .limit(1000);

    const grouped = logs.reduce((acc: any, log) => {
      const hour = new Date(log.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
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
    console.error("❌ Error fetching monitor logs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ Get logs for a specific monitor (for chart)
// ✅ Get logs for a specific monitor (full details)
export const getLogsByMonitorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const logs = await monitorLogModel
      .find({ monitorId: id })
      .sort({ timestamp: -1 }) // newest first
      .limit(1000);

    if (!logs.length) {
      return res.status(200).json({ data: [] });
    }

    // include everything you want to show on frontend
    const formatted = logs.map((log) => ({
      timestamp: log.timestamp,
      responseTime: log.responseTime,
      statusCode: log.statusCode,
      message: log.message,
    }));

    return res.status(200).json({ data: formatted });
  } catch (err) {
    console.error("❌ Error fetching monitor logs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

