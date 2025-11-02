import mongoose, { Document } from "mongoose";

export interface IMonitor extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  files?: string[];
  interval: number;
  uptime: number;
  latency: number;
  score: number;
  aiSummary: string;
}
