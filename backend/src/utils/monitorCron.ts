import axios from "axios";
import monitorModel from "../models/monitor.model.js";
import cron, { ScheduledTask } from "node-cron";

const activeJobs = new Map<string,ScheduledTask>();

export const startMonitorJob = (monitor: any) => {
  const interval = monitor.interval; 
  const cronExp = `*/${interval} * * * *`;
  if (activeJobs.has(monitor._id.toString())) {
    console.log(`Job already running for monitor ${monitor.name}`);
    return;
  }
  const job = cron.schedule(cronExp, async () => {
    const start = Date.now();
    try {
      const response = await axios({
        url: monitor.endpoint,
        method: monitor.method,
        headers: monitor.headers,
        data: monitor.body,
        timeout: 10000,
    });

    const latency = Date.now() - start;
    await monitorModel.findByIdAndUpdate(monitor._id, {
      $push: {
        logs: {
          timestamp: new Date(),
          statusCode: response.status,
          responseTime: latency,
          message: "Success",
        },
      },
      $set: {
        latency,
        uptime: 100,
      },
    });

       console.log(`✅ Monitor ${monitor.name} OK (${response.status})`);
    }  catch (err) {
    const latency = Date.now() - start;

    let statusCode = 500;
    let message = "Unknown error";

    if (axios.isAxiosError(err)) {
      statusCode = err.response?.status || 500;
      message = err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }

  await monitorModel.findByIdAndUpdate(monitor._id, {$push: {
      logs: {
        timestamp: new Date(),
        statusCode,
        responseTime: latency,
        message,
      },
    },$set: {
      latency,
      uptime: Math.max(0, monitor.uptime - 5),
    },});

  console.log(`❌ Monitor ${monitor.name} failed (${message})`);
}});

  job.start();
  activeJobs.set(monitor._id.toString(), job);
  console.log(`🕒 Started monitor job for ${monitor.name} every ${interval}m`);
};

export const stopMonitorJob = (monitorId: string) => {
  const job = activeJobs.get(monitorId);
  if (job) {
    job.stop();
    activeJobs.delete(monitorId);
    console.log(`🛑 Stopped job for monitor ${monitorId}`);
  }
};
export const restartAllMonitorJobs = async () => {
  const monitors = await monitorModel.find();
  for (const monitor of monitors) {
    startMonitorJob(monitor);
  }
};
