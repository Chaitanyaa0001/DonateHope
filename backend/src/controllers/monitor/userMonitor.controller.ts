import { Request, Response } from "express";
import monitorModel from "../../models/monitor.model";
import { startMonitorJob } from "../../utils/monitorCron";
import { aiAnalyzerService } from "../../service/aiAnalyzer.service";

export const postMonitor = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { name, endpoint, method, interval, headers, body } = req.body;

    if (!name || !endpoint || !method || !interval) {
      return res
        .status(400)
        .json({ message: "Name, endpoint, method and interval are required" });
    }

    let fileUrl = "";
    if (req.file && "path" in req.file) {
      fileUrl = (req.file as any).path;
    }

    const monitor = await monitorModel.create({
      user: user._id,
      name,
      endpoint,
      method,
      headers: headers || {},
      body: body || {},
      files: fileUrl ? [fileUrl] : [],
      interval: interval || 5,
    });

    startMonitorJob(monitor);

    return res
      .status(201)
      .json({ message: "Monitor created successfully", monitor });
  } catch (err) {
    console.error("❌ Error creating monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const analyzerMonitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitor = await monitorModel.findById(id);

    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    const logs = monitor.logs.slice(-20);
    const analysis = await aiAnalyzerService(logs);

    return res.status(200).json({ monitor: monitor.name, analysis });
  } catch (err) {
    console.error("❌ Error in analyzer monitor:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserMonitors = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const monitors = await monitorModel
      .find({ user: user._id })
      .populate("user", "email fullname role")
      .sort({ createdAt: -1 });

    return res.status(200).json({ source: "db", data: monitors });
  } catch (err) {
    console.error("❌ Error fetching user monitors:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
