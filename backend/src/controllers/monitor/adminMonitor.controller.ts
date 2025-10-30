import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model.js";
import { stopMonitorJob } from "../../utils/monitorCron.js";
import redis from "../../config/redisClient.js";

export const getAllMonitors = async (req: Request, res: Response) => {
  try {
    // stored in redis  
    const cacheKey = "all_monitors";
    const cachedMonitors = await redis.get(cacheKey);
    if (cachedMonitors) {
      console.log("serving monitor form redis cache");
      return res.status(200).json(JSON.parse(cachedMonitors));
    };
    const monitors = await monitorModel .find().populate("user", "email fullname role").sort({ createdAt: -1 });
    redis.setex(cacheKey, 60, JSON.stringify(monitors)); 

    console.log("servering cashed in Redis");
    return res.status(200).json(monitors);
  } catch (err) {
    console.error("Error fetching all monitors:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  };
};

export const deleteMonitorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);
    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    };
    await monitorModel.findByIdAndDelete(id);
    stopMonitorJob(id);

    return res.status(200).json({ message: "Monitor deleted successfully" });
  } catch (err) {
    console.error("Error deleting monitor:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
