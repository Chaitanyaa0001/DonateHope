import React, { lazy, Suspense, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Togglebutton from "@/components/ui/Togglebutton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Highest Score");

  // 🔹 Dummy monitor data for frontend display
  const monitors = [
    {
      _id: "m1",
      name: "Auth API Monitor",
      endpoint: "https://api.example.com/auth/login",
      method: "POST",
      interval: 30,
      uptime: 99.9,
      latency: 120,
      score: 92,
      aiSummary: "Stable performance with consistent response time.",
      user: { fullname: "Chaitanya", email: "chai@dev.com", role: "Developer" },
    },
    {
      _id: "m2",
      name: "Products API",
      endpoint: "https://api.example.com/products",
      method: "GET",
      interval: 60,
      uptime: 97.4,
      latency: 230,
      score: 78,
      aiSummary: "Slight increase in latency detected last 24 hours.",
      user: { fullname: "Riya", email: "riya@team.com", role: "Engineer" },
    },
    {
      _id: "m3",
      name: "Payment Gateway",
      endpoint: "https://api.example.com/payments",
      method: "POST",
      interval: 45,
      uptime: 95.6,
      latency: 340,
      score: 63,
      aiSummary: "Occasional timeouts observed — needs optimization.",
      user: { fullname: "Chaitanya", email: "chai@dev.com", role: "Developer" },
    },
  ];

  // 🔹 Filter + sort logic (frontend only)
  const filteredMonitors = monitors
    .filter(
      (m) =>
        m.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (methodFilter === "All" || m.method === methodFilter)
    )
    .sort((a, b) => {
      if (sortOption === "Highest Score") return b.score - a.score;
      if (sortOption === "Lowest Latency") return a.latency - b.latency;
      if (sortOption === "Highest Uptime") return b.uptime - a.uptime;
      return 0;
    });

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Header */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto flex justify-between items-center mt-8"
        variants={itemVariants}
      >
        <Togglebutton />
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition"
        >
          Dashboard
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto mb-16 flex flex-col sm:items-center text-center gap-2"
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Active <span className="text-purple-600 drop-shadow-sm">Monitors</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 sm:text-base">
          Track uptime, latency, and AI-powered performance insights for your APIs.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto flex flex-col md:flex-row gap-4 mb-10"
        variants={itemVariants}
      >
        {/* Search */}
        <div className="flex items-center border-2 border-green-400 focus-within:border-purple-500 rounded-md px-3 py-2 bg-white dark:bg-[#1a1a2e] w-full transition">
          <FiSearch className="text-green-500 mr-2" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search monitors"
            className="bg-transparent outline-none text-sm w-full text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Method Filter */}
        <select
          aria-label="method"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm w-full md:w-auto"
        >
          <option>All</option>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        {/* Sort Filter */}
        <select
          aria-label="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm w-full md:w-auto"
        >
          <option>Highest Score</option>
          <option>Lowest Latency</option>
          <option>Highest Uptime</option>
        </select>
      </motion.div>

      {/* Monitor Cards */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {filteredMonitors.length > 0 ? (
          filteredMonitors.map((monitor) => (
            <motion.div key={monitor._id} variants={itemVariants}>
              <Suspense
                fallback={
                  <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                }
              >
                <MonitorCard monitor={monitor} />
              </Suspense>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full flex flex-col items-center justify-center text-center py-16"
            variants={itemVariants}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486814.png"
              alt="No Monitors"
              className="w-28 h-28 opacity-80 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No monitors found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Try adjusting your search or filters to find results.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserDashboard;
