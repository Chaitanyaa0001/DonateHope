// src/pages/funder/FunderDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Togglebutton from '@/components/ui/Togglebutton';
import type { Campaign } from '@/types/campign';
import dummy from '@/assets/dummy.jpg';
import { motion, type Variants } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import { easeOut } from 'framer-motion';


const dummyCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Heart Surgery for Baby Arya',
    description: 'Baby Arya needs heart surgery. Help us raise funds.',
    image: dummy,
    goal: 1000000,
    raised: 625000,
    location: 'Mumbai, Maharashtra',
    donors: 150,
    daysLeft: 12,
    category: 'Medical',
  },
  {
    id: '2',
    title: 'Flood Relief in Kerala',
    description: 'Provide food and shelter to flood-affected families.',
    image: dummy,
    goal: 500000,
    raised: 220000,
    location: 'Kerala',
    donors: 85,
    daysLeft: 8,
    category: 'Disaster Relief',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};


const FunderDashboard: React.FC = () => {
  return (
    <div className="w-[90%] lg:w-[85%] mx-auto my-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold dark:text-white">My Campaigns</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap"
          >
            + Create New Campaign
          </Link>
          <Togglebutton />
        </div>
      </div>

      {dummyCampaigns.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No campaigns found.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {dummyCampaigns.map((card) => {
            const percent = Math.min((card.raised / card.goal) * 100, 100);
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="dark:bg-[#0d0b1d] rounded-2xl border-2 overflow-hidden border-[#C800DE] hover:shadow-lg transition duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-4 pt-3">
                  <p className="inline-block bg-green-300 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {card.category}
                  </p>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h2 className="font-semibold text-[#9810FA] sm:text-xl text-lg mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm opacity-60 italic mb-3">{card.description}</p>

                  <div className="text-sm mb-2">
                    <span className="text-[#9810FA] font-semibold">Location:</span>{' '}
                    <span className="font-medium">{card.location}</span>
                  </div>

                  <div className="text-sm text-white mb-1">
                    <span className="text-green-400 font-semibold">
                      ₹{card.raised.toLocaleString()} raised
                    </span>{' '}
                    <span className="text-black font-semibold dark:text-white">
                      of ₹{card.goal.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-700 rounded">
                    <div
                      className="h-2 bg-fuchsia-500 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm mt-2">
                    <span>🧑 {card.donors} donors</span>
                    <span>🗓 {card.daysLeft} days left</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/my-campaigns/${card.id}`}
                      className="w-full text-white bg-blue-500 hover:bg-blue-600 py-2 rounded-md text-sm text-center"
                    >
                      View Details
                    </Link>
                    <button
                      className="w-full text-white bg-red-500 hover:bg-red-600 py-2 rounded-md text-sm flex items-center justify-center gap-1"
                    >
                      <FiTrash2 className="text-base" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default FunderDashboard;
