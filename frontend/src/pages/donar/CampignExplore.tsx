import React, { useState, useMemo } from 'react';
import { FiSearch, FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';

interface Campaign {
  id: string;
  title: string;
  description: string;
  location: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  category: 'Medical' | 'Education' | 'Disaster Relief';
  image: string;
  urgent?: boolean;
}

const CampaignExplore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Mock campaign data matching the design
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Emergency Heart Surgery for Baby Arya',
      description: 'Help us save 6-month-old Arya who needs immediate heart surgery. Every donation brings hope to her family.',
      location: 'Mumbai, Maharashtra',
      raised: 325000,
      goal: 500000,
      donors: 245,
      daysLeft: 12,
      category: 'Medical',
      image: '/api/placeholder/400/250',
      urgent: true
    },
    {
      id: '2',
      title: 'Education Fund for Tribal Children',
      description: 'Support education for 100 tribal children in remote areas. Help them build a better future through learning.',
      location: 'Jharkhand',
      raised: 150000,
      goal: 200000,
      donors: 89,
      daysLeft: 25,
      category: 'Education',
      image: '/api/placeholder/400/250'
    },
    {
      id: '3',
      title: 'Flood Relief in Kerala',
      description: 'Immediate relief for flood-affected families. Providing food, shelter, and medical aid to those in need.',
      location: 'Kerala',
      raised: 750000,
      goal: 1000000,
      donors: 432,
      daysLeft: 8,
      category: 'Disaster Relief',
      image: '/api/placeholder/400/250',
      urgent: true
    }
  ];

  // Filter campaigns based on search query and category
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = searchQuery === '' || 
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || 
        campaign.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, campaigns]);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical': return 'bg-red-100 text-red-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Disaster Relief': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030918] transition-colors duration-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Active <span className="text-purple-200">Campaigns</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Discover meaningful causes and make a difference in someone's life today.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
          >
            <option value="All Categories">All Categories</option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="Disaster Relief">Disaster Relief</option>
          </select>

          {/* Sort Filter */}
          <select className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200">
            <option value="Most Recent">Most Recent</option>
            <option value="Urgent">Most Urgent</option>
            <option value="Goal Amount">Goal Amount</option>
          </select>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105"
              >
                {/* Campaign Image */}
                <div className="relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-48 object-cover"
                  />
                  {campaign.urgent && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Urgent
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(campaign.category)}`}>
                    {campaign.category}
                  </span>
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <FiMapPin className="mr-2" />
                    <span className="text-sm">{campaign.location}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <span>{formatCurrency(campaign.raised)} raised</span>
                      <span>of {formatCurrency(campaign.goal)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                      />
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                      {calculateProgress(campaign.raised, campaign.goal).toFixed(0)}% funded
                    </div>
                  </div>

                  {/* Campaign Stats */}
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center">
                      <FiUsers className="mr-1" />
                      <span>{campaign.donors} donors</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                    <span>Donate Now</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredCampaigns.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white dark:bg-gray-800 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Load More Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignExplore;
