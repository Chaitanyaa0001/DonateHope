import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Togglebutton from "@/components/ui/Togglebutton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMonitors } from "@/hooks/monitors/useMonitor";


const MonitorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { useMonitorById, useMonitorLogsById , useDeleteMonitorMutation} = useMonitors();
  const { data: monitor, isLoading, error } = useMonitorById(id!);
  const { data: logs = [] } = useMonitorLogsById(id!);
  const deleteMutation = useDeleteMonitorMutation;

const handleDelete = async () => {
  if (!id) return;

  const confirmDelete = window.confirm("Are you sure you want to delete this monitor?");
  if (!confirmDelete) return;

  try {
    await deleteMutation.mutateAsync(id);
    alert("Monitor deleted successfully!");
    navigate("/user/dashboard");
  } catch (err) {
    console.error("Failed to delete monitor:", err);
    alert("Failed to delete monitor. Please try again.");
  }
};


  if (isLoading) return <div>Loading monitor details...</div>;
  if (error) return <div>Error loading monitor details</div>;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#181824] dark:to-[#260032]">
      {/* Toggle */}
      <div className="flex justify-end mb-4">
        <Togglebutton />
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6">
  <button
    onClick={() => navigate("/user/dashboard")}
    className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md transition shadow"
  >
    ⬅ Back to Monitors
  </button>

  <button
    onClick={handleDelete}
    disabled={deleteMutation.isPending}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition shadow disabled:opacity-50"
  >
    {deleteMutation.isPending ? "Deleting..." : "🗑 Delete Monitor"}
  </button>
</div>

        {/* Endpoint & Method */}
        <div className="flex items-center gap-4 mb-3">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold border border-green-300 text-sm shadow">
            {monitor?.method}
          </span>
          <span className="font-bold text-lg text-gray-800 dark:text-white break-all">{monitor?.endpoint}</span>
        </div>
        {/* API Name */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-700 dark:text-white">{monitor?.name}</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-[#262446] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="text-xl font-bold text-green-600">{monitor?.uptime}%</div>
            <div className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Uptime</div>
          </div>
          <div className="bg-white dark:bg-[#262446] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="text-xl font-bold text-blue-600">{monitor?.latency} ms</div>
            <div className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Average Latency</div>
          </div>
          <div className="bg-white dark:bg-[#262446] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <div className="text-xl font-bold text-purple-600">{monitor?.score}/100</div>
            <div className="text-gray-700 dark:text-gray-300 mt-1 font-semibold">Perf. Score</div>
          </div>
        </div>
        {/* AI Insight */}
        {monitor?.aiSummary && (
          <div className="mb-7 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-[#140b24] dark:to-[#23182e] p-5 rounded-xl border-l-4 border-purple-500 shadow">
            <h3 className="font-semibold text-lg mb-2 text-purple-800 dark:text-purple-300">AI Insights</h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">{monitor.aiSummary}</p>
          </div>
        )}
            {/* Chart Section */}
        <div className="bg-white dark:bg-[#141425] rounded-xl p-5 shadow-md">
          <h2 className="text-xl font-semibold mb-3">Response Time (24h)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={logs}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(t) => new Date(t).toLocaleString()}
                formatter={(v: number) => [`${v} ms`, "Response Time"]}
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
        </div>
        {/* Recent Logs Table */}
        {logs.length > 0 && (
          <div className="bg-white dark:bg-[#1c1c34] rounded-xl shadow p-6 overflow-x-auto mb-12">
            <h3 className="font-semibold text-lg mb-3 text-purple-700 dark:text-purple-300">Recent Logs</h3>
            <table className="w-full text-sm border-separate [border-spacing:0_8px]">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-purple-50 dark:bg-[#332456] rounded-tl-xl">Time</th>
                  <th className="py-2 px-4 bg-purple-50 dark:bg-[#332456]">Status</th>
                  <th className="py-2 px-4 bg-purple-50 dark:bg-[#332456]">Response</th>
                  <th className="py-2 px-4 bg-purple-50 dark:bg-[#332456] rounded-tr-xl">Message</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="bg-gray-50 dark:bg-[#24243e] text-gray-700 dark:text-gray-200 rounded-xl">
                    <td className="py-2 px-4 rounded-l-xl">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded font-bold ${
                          log.statusCode >= 200 && log.statusCode < 300
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.statusCode}
                      </span>
                    </td>
                    <td className="py-2 px-4">{log.responseTime} ms</td>
                    <td className="py-2 px-4 rounded-r-xl">{log.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorDetails;
