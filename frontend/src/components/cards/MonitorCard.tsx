import React from "react";
import { Link } from "react-router-dom";

interface MonitorCardProps {
  monitor: {
    _id: string;
    name: string;
    endpoint: string;
    method: string;
    interval: number;
    uptime: number;
    latency: number;
    score: number;
    aiSummary?: string;
    user?: {
      fullname: string;
      email: string;
      role: string;
    };
  };
}

const MonitorCard: React.FC<MonitorCardProps> = ({ monitor }) => {
  const healthColor =
    monitor.score > 80
      ? "text-green-400"
      : monitor.score > 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="dark:bg-[#0d0b1d] rounded-2xl border-2 overflow-hidden border-[#C800DE] hover:shadow-lg transition duration-300 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 flex justify-between items-center">
        <p className="inline-block bg-green-300 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {monitor.method}
        </p>
        {monitor.user && (
          <span className="text-sm text-purple-500 font-medium">
            By: {monitor.user.fullname}
          </span>
        )}
      </div>

      {/* Main content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-semibold text-[#9810FA] sm:text-xl text-lg mb-1">
          {monitor.name}
        </h2>
        <p className="text-sm opacity-70 italic mb-2 break-all">
          {monitor.endpoint}
        </p>

        <div className="flex justify-between text-sm mb-2">
          <span>⏱ Interval: {monitor.interval}s</span>
          <span className={healthColor}>Score: {monitor.score}</span>
        </div>

        <div className="flex justify-between text-sm mb-1">
          <span>⚡ Latency: {monitor.latency} ms</span>
          <span>📶 Uptime: {monitor.uptime}%</span>
        </div>

        {monitor.aiSummary && (
          <p className="text-xs text-gray-400 mt-2 italic line-clamp-2">
            {monitor.aiSummary}
          </p>
        )}

        <Link to={`/monitors/${monitor._id}`}>
          <button
            type="button"
            className="mt-4 w-full text-white bg-fuchsia-500 hover:bg-fuchsia-600 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
          >
            🔍 View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(MonitorCard);
