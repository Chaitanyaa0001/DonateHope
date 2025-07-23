import React, { lazy, Suspense } from 'react';
import { FiSearch } from 'react-icons/fi';
import Togglebutton from '@/components/ui/Togglebutton';
import { motion } from 'framer-motion';
import dummy from '../../assets/dummy.jpg'

const CampaignCard = lazy(() => import('@/components/cards/CampaignCard'));

const cardData = [
  {
    id: 1,
    title: 'Emergency Heart Surgery for Baby Arya',
    description: 'Help us save 6-month-old Arya who needs immediate heart surgery. Every donation brings hope to her family.',
    location: 'Mumbai, Maharashtra',
    raised: '₹3,25,000',
    goal: '₹5,00,000',
    percent: 65,
    donors: 245,
    daysLeft: 12,
    category: 'Education',
    image: dummy,
  },
  {
    id: 2,
    title: 'Education Fund for Tribal Children',
    description: 'Support education for 100 tribal children in remote areas. Help them build a better future through learning.',
    location: 'Jharkhand',
    raised: '₹1,50,000',
    goal: '₹2,00,000',
    percent: 75,
    donors: 89,
    daysLeft: 25,
    category: 'Education',
    image: dummy,
  },
  {
    id: 3,
    title: 'Flood Relief in Kerala',
    description: 'Immediate relief for flood-affected families. Providing food, shelter, and medical aid to those in need.',
    location: 'Kerala',
    raised: '₹7,50,000',
    goal: '₹10,00,000',
    percent: 75,
    donors: 432,
    daysLeft: 8,
    category: 'Education',
    image: dummy,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CampignExplore: React.FC = () => {
  return (
    <motion.div
      className="w-[90%] sm:w-[85%] mx-auto py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <Togglebutton />
        <button className="bg-[#9D5ED5] text-white dark:text-black px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition duration-300">
          Dashboard
        </button>
      </motion.div>

      {/* Title */}
      <motion.div className="mb-16 flex flex-col sm:items-center text-center gap-2" variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Active <span className="text-purple-600 drop-shadow-sm">Campaigns</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 sm:text-base">
          Discover meaningful causes and make a difference in someone's life today.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div className="flex flex-col md:flex-row gap-4 mb-10" variants={itemVariants}>
        {/* Search Box */}
        <div className="flex items-center border-2 border-gray-300 focus-within:border-purple-500 rounded-md px-3 py-2 bg-white dark:bg-[#1a1a2e] w-full transition duration-300">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            name="search"
            placeholder="Search campaigns"
            className="bg-transparent outline-none text-sm w-full text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <select
          aria-label="Category"
          className="bg-white dark:bg-[#1a1a2e] border border-gray-400 rounded-md px-3 py-2 text-sm text-gray-800 dark:text-white w-full md:w-auto transition duration-300"
        >
          <option>Medical</option>
          <option>Education</option>
          <option>Disaster Relief</option>
          <option>Community</option>
          <option>NGO</option>
        </select>

        {/* Sort Filter */}
        <select
          aria-label="Sort"
          className="bg-white dark:bg-[#1a1a2e] border border-gray-400 rounded-md px-3 py-2 text-sm text-gray-800 dark:text-white w-full md:w-auto transition duration-300"
        >
          <option>Most Recent</option>
          <option>Most Urgent</option>
          <option>Most Funded</option>
        </select>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {cardData.map((card) => (
          <motion.div key={card.id} variants={itemVariants}>
            <Suspense fallback={<div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}>
              <CampaignCard card={card} />
            </Suspense>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CampignExplore;
