// src/pages/funder/MyCampaignDetails.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Campaign } from '@/types/campign';
import Togglebutton from '@/components/ui/Togglebutton';
import dummy from '@/assets/dummy.jpg';

// Dummy campaigns
const dummyCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Heart Surgery for Baby Arya',
    description: 'Baby Arya needs immediate heart surgery. Your donation can save her life.',
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
    description: 'Thousands are affected by floods. Provide urgent aid.',
    image: dummy,
    goal: 500000,
    raised: 220000,
    location: 'Kerala',
    donors: 85,
    daysLeft: 8,
    category: 'Disaster Relief',
  },
];

const MyCampaigns: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const campaign = dummyCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="text-center mt-10 text-red-500 dark:text-red-400">
        Campaign not found.
      </div>
    );
  }

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ← Back to Dashboard
        </button>
        <Togglebutton />
      </div>

      {/* Campaign Details */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <img src={campaign.image} alt={campaign.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 dark:text-white">{campaign.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{campaign.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
              {campaign.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
              {campaign.location}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
              {campaign.daysLeft} days left
            </span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-sm">
              {campaign.donors} donors
            </span>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()}
            </p>
            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCampaigns;
