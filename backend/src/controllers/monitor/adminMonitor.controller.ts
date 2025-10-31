import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model.js";
import { stopMonitorJob } from "../../utils/monitorCron.js";
import redis from "../../config/redisClient.js";

export const getAllMonitors = async (req: Request, res: Response) => {
  try {
    const cachekey = "all_monitors";
    const cachedData = await  redis.get(cachekey);
    if (cachedData) {
      return res.status(200).json({ source: "cache", data: JSON.parse(cachedData) });
    };
    const monitors = await monitorModel.find().populate("user", "email fullname role").sort({ createdAt: -1 });

    redis.set(cachekey, JSON.stringify(monitors), "EX", 10); 
    return res.status(200).json({ source: "db", data: monitors });
  } catch (err) {
    console.error("❌ Error fetching all monitors:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMonitorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    const deletedMonitor = await monitorModel.findByIdAndDelete(id);
    stopMonitorJob(id);

    return res.status(200).json({
      message: "Monitor deleted successfully",
      deletedMonitor,
    });
  } catch (err) {
    console.error("❌ Error deleting monitor:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
