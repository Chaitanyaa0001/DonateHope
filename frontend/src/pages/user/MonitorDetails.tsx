import React from "react";
import { useNavigate } from "react-router-dom";
import Togglebutton from "@/components/ui/Togglebutton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// 🧩 Mock Monitor Data (replace with backend data later)
const sampleMonitor = {
  _id: "m123",
  name: "User Authentication API",
  endpoint: "https://api.example.com/auth/login",
  method: "POST",
  interval: 60,
  uptime: 98.6,
  latency: 350,
  score: 85,
  updatedAt: new Date().toISOString(),
  aiSummary:
    "The monitor shows stable performance with slight latency spikes during peak hours. Overall health is good.",
  logs: Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    responseTime: Math.floor(200 + Math.random() * 150),
  })).reverse(),
};

const MonitorDetails: React.FC = () => {
  const navigate = useNavigate();

  const monitor = sampleMonitor;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-2">
      {/* Dark/Light Mode Toggle */}
      <div className="flex justify-end mb-4">
        <Togglebutton />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/monitors")}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition"
        >
          ⬅ Back to Monitors
        </button>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-600 dark:text-white">
          {monitor.name}
        </h1>
        <p className="text-gray-400 mb-2 break-all">{monitor.endpoint}</p>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-100 dark:bg-[#1a1a2e] rounded-xl shadow">
            <p>📶 Uptime: <b>{monitor.uptime}%</b></p>
            <p>⚡ Avg Latency: <b>{monitor.latency} ms</b></p>
            <p>📊 Score: <b>{monitor.score}</b></p>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-[#1a1a2e] rounded-xl shadow">
            <p>Method: <b>{monitor.method}</b></p>
            <p>Interval: <b>{monitor.interval}s</b></p>
            <p>Last Updated: <b>{new Date(monitor.updatedAt).toLocaleString()}</b></p>
          </div>
        </div>

        {/* Response Time Chart */}
        <h2 className="text-xl font-semibold mb-2">Response Time Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monitor.logs}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(t) => new Date(t).toLocaleTimeString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(t) => new Date(t).toLocaleTimeString()}
              formatter={(value: number) => [`${value} ms`, "Response Time"]}
            />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#C800DE"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* AI Summary */}
        {monitor.aiSummary && (
          <div className="mt-6 bg-purple-50 dark:bg-[#140b24] p-4 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">AI Insights</h3>
            <p className="text-gray-700 dark:text-gray-300">{monitor.aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorDetails;
