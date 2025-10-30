import mongoose, { Schema } from "mongoose";
import { IMonitor } from "../types/monitor.type";

const monitorSchema = new Schema<IMonitor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
        type: String,
        required: true
    },
    endpoint: {
        type: String, 
        required: true
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT","PATCH", "DELETE"],
      default: "GET",
    },
    headers: {
        type: Object,
        default: {}
    },
    body: {
        type: Object,
        default: {}
    },
    files:
        [{ type: String}],
    interval: {
        type: Number,
        default: 5
    },
    uptime:{
        type: Number,
        default: 100
    },
    latency:{
        type: Number,
        default: 0
    },
    score:{
        type: Number,
        default: 100
    },
    aiSummary:{
        type: String,
        default: ""
    },
    logs: [
      {
        timestamp: { type: Date, default: Date.now },
        statusCode: Number,
        responseTime: Number,
        message: String,
      },
    ],
  },
  { timestamps: true }
);

monitorSchema.index({ user: 1 });
monitorSchema.index({ endpoint: 1 });

export default mongoose.model<IMonitor>("Monitor", monitorSchema);
