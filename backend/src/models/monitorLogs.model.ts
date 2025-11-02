// src/models/monitorLog.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMonitorLog extends Document {
  monitorId: mongoose.Types.ObjectId;
  timestamp: Date;
  statusCode: number;
  responseTime: number;
  message: string;
}

const monitorLogSchema = new Schema<IMonitorLog>(
  {
    monitorId: { type: Schema.Types.ObjectId, ref: "Monitor", required: true },
    timestamp: { type: Date, default: Date.now },
    statusCode: Number,
    responseTime: Number,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model<IMonitorLog>("MonitorLog", monitorLogSchema);
