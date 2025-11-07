// src/utils/monitorCron.ts
import axios from "axios";
import cron, { ScheduledTask } from "node-cron";
import monitorModel from "../models/monitor.model.js";
import MonitorLogs from "../models/monitorLogs.model.js";
import { aiAnalyzerService } from "../service/aiAnalyzer.service.js";

const activeJobs = new Map<string, ScheduledTask>();
const jobTimers = new Map<string, NodeJS.Timeout>();
const MAX_LOGS_PER_MONITOR = 8;

//  Perform one monitor check (used both for instant + cron jobs)
export const performMonitorCheck = async (monitor: any, instantCheck = false) => {
  const start = Date.now();
  let latency = 0;
  let statusCode = 500;
  let message = "";

  try {
    const response = await axios({
      url: monitor.endpoint,
      method: monitor.method,
      headers: monitor.headers || {},
      data: monitor.body || {},
      timeout: 10000,
    });

    latency = Date.now() - start;
    statusCode = response.status;
    message = "Success";

    // Create log
    await MonitorLogs.create({
      monitorId: monitor._id,
      statusCode,
      responseTime: latency,
      message,
    });

    // Update monitor stats
    await monitorModel.findByIdAndUpdate(monitor._id, {
      $set: { latency, uptime: 100 },
    });

    console.log(`✅ [${monitor.name}] OK (${response.status})`);
  } catch (err: any) {
    latency = Date.now() - start;
    message = err?.message || "Request failed";
    statusCode = err?.response?.status || 500;

    await MonitorLogs.create({
      monitorId: monitor._id,
      statusCode,
      responseTime: latency,
      message,
    });

    await monitorModel.findByIdAndUpdate(monitor._id, {
      $set: {
        latency,
        uptime: Math.max(0, (monitor.uptime || 100) - 5),
      },
    });

    console.log(` [${monitor.name}] failed (${message})`);
  }

  try {
    const count = await MonitorLogs.countDocuments({ monitorId: monitor._id });
    if (count > MAX_LOGS_PER_MONITOR) {
      const toDelete = count - MAX_LOGS_PER_MONITOR;
      await MonitorLogs.find({ monitorId: monitor._id })
        .sort({ timestamp: 1 }) 
        .limit(toDelete)
        .deleteMany();
      console.log(`🧹 Trimmed logs for ${monitor.name} (kept ${MAX_LOGS_PER_MONITOR})`);
    }
  } catch (err: any) {
    console.error(` Log cleanup failed for ${monitor.name}:`, err.message);
  }

  // Generate AI summary only once initially or every 5th check
  try {
    const logCount = await MonitorLogs.countDocuments({ monitorId: monitor._id });
    if (instantCheck || logCount % 5 === 0) {
      const logs = await MonitorLogs.find({ monitorId: monitor._id })
        .sort({ timestamp: -1 })
        .limit(10);

      const summary = await aiAnalyzerService(logs);
      await monitorModel.findByIdAndUpdate(monitor._id, {
        aiSummary: summary,
        lastAnalyzedAt: new Date(),
      });

      console.log(
        ` AI summary ${instantCheck ? "(initial)" : "(auto)"} updated for ${monitor.name}`
      );
    }
  } catch (err: any) {
    console.error(` AI summary failed for ${monitor.name}:`, err.message);
  }
};

export const startMonitorJob = (monitor: any) => {
  const interval = monitor.interval || 5; // minutes
  const cronExp = `*/${interval} * * * *`;

  if (activeJobs.has(monitor._id.toString())) {
    console.log(` Job already running for ${monitor.name}`);
    return;
  }

  const job = cron.schedule(cronExp, async () => {
    await performMonitorCheck(monitor);
  });

  job.start();
  activeJobs.set(monitor._id.toString(), job);

  // stop in 12 hours 
      const timeout = setTimeout(() => {
        stopMonitorJob(monitor._id.toString());
        console.log(` Auto-stopped monitor ${monitor.name} after 12 hours`);
      }, 12 * 60 * 60 * 1000);
    
      jobTimers.set(monitor._id.toString(), timeout);

  console.log(` Started job for ${monitor.name} every ${interval} min`);
};

export const stopMonitorJob = (monitorId: string) => {
  const job = activeJobs.get(monitorId);
  if (job) {
    job.stop();
    activeJobs.delete(monitorId);
    console.log(` Stopped job for monitor ${monitorId}`);
  }
};

export const restartAllMonitorJobs = async () => {
  const monitors = await monitorModel.find();
  for (const monitor of monitors) {
    startMonitorJob(monitor);
  }
  console.log(` Restarted ${monitors.length} monitor jobs`);
};

export const deleteMonitorLogs = async (monitorId: string) => {
  await MonitorLogs.deleteMany({ monitorId });
  stopMonitorJob(monitorId);
  console.log(` Deleted all logs for monitor ${monitorId}`);
};
