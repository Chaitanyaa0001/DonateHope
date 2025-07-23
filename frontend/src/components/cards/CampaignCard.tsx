import React from 'react';

interface CampaignCardProps {
  card: {
    id: number;
    title: string;
    description: string;
    location: string;
    raised: string;
    goal: string;
    percent: number;
    donors: number;
    daysLeft: number;
    category: string;
    image: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ card }) => {
  return (
    <div className="dark:bg-[#0d0b1d] rounded-2xl border-2 overflow-hidden  border-[#C800DE] hover:shadow-lg transition duration-300 flex flex-col">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category */}
      <div className="px-4 pt-3">
        <p className="inline-block bg-fuchsia-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {card.category}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-white font-semibold text-lg mb-1">{card.title}</h2>
        <p className="text-sm text-gray-300 mb-3">{card.description}</p>
        <div className="text-gray-400 text-sm mb-2 flex items-center gap-1">
          <span className="material-icons text-base">location_on</span>
          {card.location}
        </div>
        <div className="text-sm text-white mb-1">
          <span className="text-green-400 font-semibold">{card.raised} raised</span> of {card.goal}
        </div>

        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className="h-2 bg-fuchsia-500 rounded"
            style={{ width: `${card.percent}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>🧑 {card.donors} donors</span>
          <span>🗓 {card.daysLeft} days left</span>
        </div>

        <button
          type="button"
          className="mt-4 w-full text-white bg-fuchsia-500 hover:bg-fuchsia-600 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
        >
          💜 Donate Now
        </button>
      </div>
    </div>
  );
};

export default React.memo(CampaignCard);
