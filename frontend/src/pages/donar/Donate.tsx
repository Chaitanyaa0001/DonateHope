import React  from 'react';
import { useParams, useNavigate, } from 'react-router-dom';


import Togglebutton from '@/components/ui/Togglebutton';

// import type { Campaign } from '@/types/campign';
import { useCampaigns } from '@/hooks/campagin/usecampagin';
import { useState } from 'react';


const Donate: React.FC = () => {

  const { id } = useParams();
  const {useCampaignByIdQuery} = useCampaigns();

  const {data:campaign, isLoading, isError, error} = useCampaignByIdQuery(id!);

  console.log("Fetched campaign:", campaign);
console.log("Fetch error details:", error);

  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  

  const handleQuickSelect = (val: number) => {
    setAmount(val.toString());
   
  };

  const handleDonateClick = () => {
   
  };


  if (isLoading) return (
  <div className="text-center text-gray-700 dark:text-white p-6">
    Loading...
  </div>
);


if (isError || !campaign) return (
  <div className="text-center text-gray-700 dark:text-white p-6">
    Failed to load campaign. 
  </div>
);

  if (!campaign)
    return (
      <div className="text-center text-gray-700 dark:text-white p-6">
        Loading...
      </div>
    );

    const percent = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  return (
    <div className={`min-h-screen py-8 px-4 sm:px-2`}>
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
        <Togglebutton />
      </div>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/explore')}
          className="mb-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md transition"
        >
          ⬅ Back to Campaigns
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-600 dark:text-white">{campaign.title} </h1>
        <p>By: {campaign.user?.fullname || "Anonymous"}</p>
        <img
          src={campaign.image}
          alt="Campaign"
          className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
        />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full shadow">
            {campaign.category}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            📍 {campaign.location}
          </span>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full mb-2">
          <div
            className="h-4 bg-green-500 rounded-full transition-all"
            style={{ width: `${percent}%` }}

          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>
            <strong>{campaign.raised}</strong> raised
          </span>
          <span>
            <strong>{campaign.goal}</strong> goal
          </span>
          <span>
            <strong>{campaign.donors}</strong> donors
          </span>
          <span>
            <strong>{campaign.daysLeft}</strong> days left
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {campaign.location}
        </p>

        {/* Donation Form */}
        <div className="bg-gray-100 dark:bg-[#1a1a2e] p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Make a Donation
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[100, 250, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleQuickSelect(amt)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter custom amount"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />


          <button
            onClick={handleDonateClick}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-md font-semibold mt-2 transition"
          >
            💳 Proceed to Payment
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      
    </div>
  );
};

export default Donate;
