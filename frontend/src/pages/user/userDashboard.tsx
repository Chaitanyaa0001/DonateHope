// src/pages/UserDashboard.tsx
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Network, Clock, Gauge, HeartPulse } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMonitors } from "@/hooks/monitors/useMonitor";

const MonitorCard = lazy(() => import("@/components/cards/MonitorCard"));

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const UserDashboard: React.FC = () => {

  const { useUserMonitorsQuery, useUserMonitorLogsQuery } = useMonitors();
const { data: monitors = [], isLoading, error } = useUserMonitorsQuery;
const {data: responseData = [] } = useUserMonitorLogsQuery 


  if (isLoading) return <div>Loading monitors...</div>;
  if (error) return <div>Error loading monitors</div>;

  const totalAPIs = monitors.length;
 // ✅ Safe average calculations
const avgUptime =
  monitors.length > 0
    ? monitors.reduce((acc, cur) => acc + (cur.uptime ?? 0), 0) / monitors.length
    : 0;

const avgLatency =
  monitors.length > 0
    ? monitors.reduce((acc, cur) => acc + (cur.latency ?? 0), 0) / monitors.length
    : 0;

const avgHealth =
  monitors.length > 0
    ? monitors.reduce((acc, cur) => acc + (cur.score ?? 0), 0) / monitors.length
    : 0;



  
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Title */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto mb-12 flex flex-col sm:items-start text-center gap-2 mt-10"
        variants={itemVariants}
      >
        <h1 className="text-4xl font-bold">
          Monitor <span className="text-purple-600">Dashboard</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Monitor all your APIs in real-time 🚀
        </p>
      </motion.div>

      {/* ====== Top Metric Cards ====== */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        variants={itemVariants}
      >
        {/* Total APIs */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Network className="text-purple-600" />
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold">
              Total APIs
            </h2>
          </div>
          <h3 className="text-3xl font-bold">{totalAPIs}</h3>
          <p className="text-gray-500 text-sm">Being monitored</p>
        </div>

        {/* Avg Uptime */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Clock className="text-green-500" />
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold">
              Avg Uptime
            </h2>
          </div>
          <h3 className="text-3xl font-bold">{avgUptime.toFixed(1)}%</h3>
          <p className="text-green-500 text-sm">+2.3% from last week</p>
        </div>

        {/* Avg Latency */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Gauge className="text-yellow-500" />
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold">
              Avg Latency
            </h2>
          </div>
          <h3 className="text-3xl font-bold">{avgLatency.toFixed(0)}ms</h3>
          <p className="text-yellow-500 text-sm">Within threshold</p>
        </div>

        {/* Health Score */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <HeartPulse className="text-blue-500" />
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold">
              Health Score
            </h2>
          </div>
          <h3 className="text-3xl font-bold">{avgHealth.toFixed(0)}/100</h3>
          <p className="text-green-500 text-sm">Excellent</p>
        </div>
      </motion.div>

      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto mb-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Response Time Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={responseData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {monitors.length > 0 ? (
          monitors.map((monitor) => (
            <motion.div key={monitor._id} variants={itemVariants}>
              <Suspense
                fallback={
                  <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                }
              >
                <MonitorCard monitor={monitor}  />
              </Suspense>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486814.png"
              alt="No Monitors"
              className="w-28 h-28 opacity-80 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No monitors found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Try adjusting your filters or add new monitors.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;
