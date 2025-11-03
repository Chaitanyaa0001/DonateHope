import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiActivity, FiCpu } from "react-icons/fi";

interface MonitorCardProps {
  monitor: {
    _id: string;
    name: string;
    endpoint: string;
    method: string;
    interval: number;
    uptime?: number;
    latency?: number;
    user?: {
      fullname: string;
      email: string;
      role: string;
    };
  };
 
}

const MonitorCard: React.FC<MonitorCardProps> = ({ monitor }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(200, 0, 222, 0.4)" }}
      className="dark:bg-[#0d0b1d] bg-white rounded-2xl border border-[#C800DE]/60 hover:border-[#C800DE] transition duration-300 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 pt-3 flex justify-between items-center">
        <p className="inline-block bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {monitor.method}
        </p>
        {monitor.user && (
          <span className="text-xs text-purple-400 font-medium">
            {monitor.user.fullname}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-semibold text-[#C800DE] sm:text-lg text-base mb-1 line-clamp-1">
          {monitor.name}
        </h2>
        <p className="text-xs opacity-70 italic mb-3 break-all">{monitor.endpoint}</p>

        <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <FiClock className="text-purple-400" />
            <span>{monitor.interval} min</span>
          </div>
          <div className="flex items-center gap-2">
            <FiActivity className="text-green-400" />
            <span>{monitor.uptime ?? "—"}%</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCpu className="text-pink-400" />
            <span>{monitor.latency ?? "—"} ms</span>
          </div>
        </div>

        
          <Link to={`/user/monitor/${monitor._id}`}>
            <button
              type="button"
              className="mt-4 w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white hover:from-fuchsia-500 hover:to-purple-600 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
            >
              🔍 View Details
            </button>
          </Link>
      </div>
    </motion.div>
  );
};

export default React.memo(MonitorCard);
