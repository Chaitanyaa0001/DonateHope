import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model.js";
import { stopMonitorJob } from "../../utils/monitorCron.js";
import redis from "../../config/redisClient.js";

// Cache keys
const userCacheKey = (userId: string) => `user_monitors_${userId}`;
const adminCacheKey = "admin_all_monitors";

export const deleteMonitorByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);

    if (!monitor)
      return res.status(404).json({ message: "Monitor not found" });

    await monitorModel.findByIdAndDelete(id);
    stopMonitorJob(id);

    await redis
      .del([userCacheKey(monitor.user.toString()), adminCacheKey])
      .catch(console.error);

    return res.status(200).json({
      message: "Monitor deleted successfully",
      deletedMonitor: monitor,
    });
  } catch (err) {
    console.error(" Error deleting monitor:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
