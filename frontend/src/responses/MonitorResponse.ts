export interface MonitorData {
  _id: string;
  name: string;
  endpoint: string;
  method: string;
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, string>;
  files?: string[];
  latency?: number;
  uptime?: number;
  score?: number;
  logs?: { timestamp: string; responseTime: number; status: number }[];
  aiSummary?: string;
  user?: {
    fullname: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewMonitorData {
  name: string;
  endpoint: string;
  method: string;
  interval: number;
  headers?: Record<string, string>;
  body?: Record<string, string>;
  file?: File | null;
}