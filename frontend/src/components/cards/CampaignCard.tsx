import React from "react";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  card: {
    _id: string;
    title: string;
    description: string;
    location: string;
    raised: number;
    goal: number;
    donors: number;
    daysLeft: number;
    category: string;
    image: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ card }) => {
  const percent = Math.round((card.raised / card.goal) * 100);

  return (
    <div className="dark:bg-[#0d0b1d] rounded-2xl border-2 overflow-hidden border-[#C800DE] hover:shadow-lg transition duration-300 flex flex-col">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover" />
      </div>

      {/* Category */}
      <div className="px-4 pt-3">
        <p className="inline-block bg-green-300 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          {card.category}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-semibold text-[#9810FA] sm:text-xl text-lg mb-1">{card.title}</h2>
        <p className="text-sm opacity-60 italic mb-3">{card.description}</p>

        <div className="text-sm mb-2 flex items-center gap-1">
          <span className="material-icons text-[#9810FA] font-bold text-base">Location:</span>
          <span className="font-medium">{card.location}</span>
        </div>

        <div className="text-sm text-white mb-1">
          <span className="text-green-400 font-semibold">{card.raised} raised</span>{" "}
          <span className="text-black font-semibold dark:text-white">
            of {card.goal}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-700 rounded">
          <div className="h-2 bg-fuchsia-500 rounded" style={{ width: `${percent}%` }} />
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span>🧑 {card.donors} donors</span>
          <span>🗓 {card.daysLeft} days left</span>
        </div>

        <Link to={`/paynment/${card._id}`}>
          <button
            type="button"
            className="mt-4 w-full text-white bg-fuchsia-500 hover:bg-fuchsia-600 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
          >
            💜 Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(CampaignCard);
