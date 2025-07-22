import React from 'react'
import { FiSearch } from 'react-icons/fi'
import Togglebutton from '@/components/ui/Togglebutton'

const cardData = [
  {
    id: 1,
    title: "Emergency Heart Surgery for Baby Arya",
    description: "Help us save 6-month-old Arya who needs immediate heart surgery. Every donation brings hope to her family.",
    location: "Mumbai, Maharashtra",
    raised: "₹3,25,000",
    goal: "₹5,00,000",
    percent: 65,
    donors: 245,
    daysLeft: 12,
    tags: ["Urgent", "Medical"],
    image: "/images/arya.jpg",
  },
  {
    id: 2,
    title: "Education Fund for Tribal Children",
    description: "Support education for 100 tribal children in remote areas. Help them build a better future through learning.",
    location: "Jharkhand",
    raised: "₹1,50,000",
    goal: "₹2,00,000",
    percent: 75,
    donors: 89,
    daysLeft: 25,
    tags: ["Education"],
    image: "/images/education.jpg",
  },
  {
    id: 3,
    title: "Flood Relief in Kerala",
    description: "Immediate relief for flood-affected families. Providing food, shelter, and medical aid to those in need.",
    location: "Kerala",
    raised: "₹7,50,000",
    goal: "₹10,00,000",
    percent: 75,
    donors: 432,
    daysLeft: 8,
    tags: ["Urgent", "Disaster Relief"],
    image: "/images/kerala.jpg",
  },
]

const CampignExplore: React.FC = () => {
  return (
    <div className="w-[90%] sm:w-[85%]  mx-auto py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Togglebutton />
        <button className="text-white dark:text-black bg-[#9D5ED5] px-4 py-2 rounded-md font-semibold">
          Dashboard
        </button>
      </div>

      {/* Title */}
      <div className="mb-20 flex flex-col sm:items-center ">
        <h1 className="text-3xl font-bold  sm:text-4xl  lg:text-6xl">Active <span className='text-purple-600 text-shadow-white'>Campaigns</span> </h1>
        <p className="opacity-80 dark:opacity-55 sm:text-[1rem] ">Discover meaningful causes and make a difference in someone's life today.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 w-[100%] mb-6">
        <div className="flex items-center border border-gray-50 rounded-[6px] px-3 py-2  dark:bg-[#1a1a2e] w-full ">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            name="search"
            placeholder="Search campaigns"
            className="bg-transparent outline-none  "
          />
        </div>

        <select aria-label='State' className="bg-white dark:bg-[#1a1a2e] border border-gray-400 rounded-[6px] px-3 py-2 text-sm w-full md:w-auto">
          <option>Medical</option>
          <option>Education</option>
          <option>Disaster Relief</option>
          <option>Community</option>
          <option>NGO</option>
        </select>

        <select aria-label='State' className="bg-white dark:bg-[#1a1a2e] border border-gray-400 rounded-md px-3 py-2 text-sm w-full md:w-auto">
          <option>Most Recent</option>
          <option>Most Urgent</option>
          <option>Most Funded</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="bg-[#0d0b1d] rounded-2xl overflow-hidden border border-[#292241] hover:shadow-lg transition duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tag === "Urgent"
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h2 className="text-white font-semibold text-lg mb-1">{card.title}</h2>
              <p className="text-sm text-gray-300 mb-3">{card.description}</p>

              {/* Location */}
              <div className="text-gray-400 text-sm mb-2 flex items-center gap-1">
                <span className="material-icons text-base">location_on</span>
                {card.location}
              </div>

              {/* Progress */}
              <div className="text-sm text-white mb-1">
                <span className="text-green-400 font-semibold">{card.raised} raised</span>{" "}
                of {card.goal}
              </div>
              <div className="w-full h-2 bg-gray-700 rounded">
                <div
                  className="h-2 bg-fuchsia-500 rounded"
                  style={{ width: `${card.percent}%` }}
                ></div>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-sm text-gray-300 mt-2">
                <span>🧑 {card.donors} donors</span>
                <span>🗓 {card.daysLeft} days left</span>
              </div>

              <button className="mt-4 w-full text-white bg-fuchsia-500 hover:bg-fuchsia-600 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2">
                💜 Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CampignExplore
