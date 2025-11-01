import React from "react";
import { motion, type Variants, easeOut } from "framer-motion";
import { FiTrash2, FiServer } from "react-icons/fi";
import Togglebutton from "@/components/ui/Togglebutton";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut }, // ✅ fixed here
  },
};

const AdminDashboard: React.FC = () => {
  // demo users
  const users = [
    {
      _id: "1",
      fullname: "Chaitanya Singh",
      email: "chai@demo.com",
      role: "admin",
      isVerified: true,
      createdAt: "2024-07-12",
    },
    {
      _id: "2",
      fullname: "Rohit Kumar",
      email: "rohit@demo.com",
      role: "user",
      isVerified: true,
      createdAt: "2024-08-20",
    },
    {
      _id: "3",
      fullname: "Neha Sharma",
      email: "neha@demo.com",
      role: "user",
      isVerified: false,
      createdAt: "2024-09-01",
    },
  ];

  // demo monitors
  const monitors = [
    {
      _id: "m1",
      name: "Donation API Health",
      endpoint: "https://api.donationhub.org/health",
      method: "GET",
      user: "Chaitanya Singh",
      uptime: 98,
      latency: 120,
      score: 92,
    },
    {
      _id: "m2",
      name: "Payment Gateway",
      endpoint: "https://secure.payments.com/ping",
      method: "POST",
      user: "Rohit Kumar",
      uptime: 87,
      latency: 240,
      score: 80,
    },
  ];

  const handleDelete = (type: "user" | "monitor", id: string) => {
    if (window.confirm(`Delete this ${type}?`)) {
      console.log(`Deleted ${type} with ID: ${id}`);
    }
  };

  return (
    <div className="min-h-screen p-6 dark:bg-[#0c0c1d] bg-gray-50 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
        <Togglebutton />
      </div>

      {/* USERS SECTION */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">👥 Manage Users</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {users.map((user) => (
            <motion.div
              key={user._id}
              variants={card}
              className="p-5 rounded-2xl border border-purple-400 bg-white dark:bg-[#141124] shadow-md"
            >
              <h3 className="text-lg font-semibold text-purple-400">{user.fullname}</h3>
              <p className="text-sm opacity-80">{user.email}</p>
              <p className="text-sm mt-1">
                Role:{" "}
                <span
                  className={`font-semibold ${
                    user.role === "admin" ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  {user.role}
                </span>
              </p>
              <p className="text-sm">Joined: {user.createdAt}</p>
              <p
                className={`text-sm mt-1 ${
                  user.isVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.isVerified ? "✅ Verified" : "❌ Not Verified"}
              </p>

              <button
                onClick={() => handleDelete("user", user._id)}
                className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-2 transition"
              >
                <FiTrash2 /> Delete User
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MONITORS SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">🌐 API Monitors</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {monitors.map((m) => (
            <motion.div
              key={m._id}
              variants={card}
              className="p-5 rounded-2xl border border-purple-400 bg-white dark:bg-[#141124] shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-purple-400 flex items-center gap-2">
                  <FiServer /> {m.name}
                </h3>
                <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded">
                  {m.method}
                </span>
              </div>
              <p className="text-sm break-all text-gray-500">{m.endpoint}</p>
              <p className="text-sm mt-2">
                Owner: <span className="font-medium text-blue-400">{m.user}</span>
              </p>
              <p className="text-sm">Uptime: {m.uptime}%</p>
              <p className="text-sm">Latency: {m.latency}ms</p>
              <p className="text-sm">Score: {m.score}</p>

              <button
                onClick={() => handleDelete("monitor", m._id)}
                className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center gap-2 transition"
              >
                <FiTrash2 /> Delete Monitor
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AdminDashboard;
