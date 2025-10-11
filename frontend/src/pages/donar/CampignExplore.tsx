// src/pages/CampaignExplore.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Togglebutton from "@/components/ui/Togglebutton";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/hooks/campagin/usecampagin";

const CampaignCard = lazy(() => import("@/components/cards/CampaignCard"));

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const CampaignExplore: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns, getAllCampaigns } = useCampaigns();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Most Recent");

  useEffect(() => {
    getAllCampaigns();
  }, [getAllCampaigns]);

  const filteredCampaigns = campaigns
    .filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = category === "All" || c.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortOption === "Most Urgent") return a.daysLeft - b.daysLeft;
      if (sortOption === "Most Funded") return b.raised - a.raised;
      return 0;
    });

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Header */}
      <motion.div className="w-[90%] sm:w-[85%] mx-auto flex justify-between items-center mt-8" variants={itemVariants}>
        <Togglebutton />
        <button
          onClick={() => navigate("/paymenthistory")}
          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition"
        >
          Payment History
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="w-[90%] sm:w-[85%] mx-auto mb-16 flex flex-col sm:items-center text-center gap-2"
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Active <span className="text-purple-600 drop-shadow-sm">Campaigns</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 sm:text-base">
          Discover meaningful causes and make a difference in someone's life today.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div className="w-[90%] sm:w-[85%] mx-auto flex flex-col md:flex-row gap-4 mb-10" variants={itemVariants}>
        {/* Search Box */}
        <div className="flex items-center border-2 border-green-400 focus-within:border-purple-500 rounded-md px-3 py-2 bg-white dark:bg-[#1a1a2e] w-full transition">
          <FiSearch className="text-green-500 mr-2" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search campaigns"
            className="bg-transparent outline-none text-sm w-full text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <select
        aria-label="state"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm w-full md:w-auto"
        >
          <option>All</option>
          <option>Medical</option>
          <option>Education</option>
          <option>Disaster Relief</option>
          <option>Community</option>
          <option>NGO</option>
        </select>

        {/* Sort Filter */}
        <select
        aria-label="state"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm w-full md:w-auto"
        >
          <option>Most Recent</option>
          <option>Most Urgent</option>
          <option>Most Funded</option>
        </select>
      </motion.div>

      {/* Campaign Cards */}
      {/* Campaign Cards */}
<motion.div
  className="w-[90%] sm:w-[85%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={containerVariants}
>
  {filteredCampaigns.length > 0 ? (
    filteredCampaigns.map((campaign) => (
      <motion.div key={campaign._id} variants={itemVariants}>
        <Suspense
          fallback={
            <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          }
        >
          <CampaignCard card={campaign} />
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
        alt="No Campaigns"
        className="w-28 h-28 opacity-80 mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        No campaigns available
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        Try adjusting your search or filters to find more results.
      </p>
    </motion.div>
  )}
</motion.div>


      <Footer />
    </motion.div>
  );
};

export default CampaignExplore;
