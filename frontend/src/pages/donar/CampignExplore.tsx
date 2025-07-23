import React, { lazy, Suspense, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Togglebutton from '@/components/ui/Togglebutton';
import { motion } from 'framer-motion';
import dummy from '../../assets/dummy.jpg'
import Footer from '@/components/Footer';
import { useNavigate} from 'react-router-dom';

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
  },{
  id: 4,
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
  {
  id: 5,
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
  {
  id: 6,
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
  {
  id: 7,
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
  {
  id: 8,
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
  {
  id: 9,
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
  {
  id: 10,
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
  const navigate = useNavigate();
  const [searchtext, setsearchtext] = useState('');
  const [selectcategory, setselectcategory] = useState('All')  
  const [sortoptions, setsortoptions] = useState("Most Recent ")

  const filteredCampaigns = cardData
  .filter((card) => {
    const matchSearch = card.title.toLowerCase().includes(searchtext.toLowerCase());
    const matchCategory = selectcategory === 'All' || card.category === selectcategory;
    return matchSearch && matchCategory;
  })
  .sort((a, b) => {
    if (sortoptions === 'Most Urgent') return a.daysLeft - b.daysLeft;
    if (sortoptions === 'Most Funded') return parseInt(b.raised.replace(/\D/g, '')) - parseInt(a.raised.replace(/\D/g, ''));
    return b.id - a.id; // assuming most recent means newest ID
  });

  return (
    <motion.div
      className= ""
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className=" w-[90%] sm:w-[85%] mx-auto flex justify-between items-center mt-8" variants={itemVariants}>
        <Togglebutton />
        <div className="flex gap-3">
          <button
          type="button"
          className="bg-green-500 text-white dark:text-black px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition duration-300"
          onClick={() => navigate('/paymenthistory')}
        >
          Payment History
        </button>
        </div>
      </motion.div>


      {/* Title */}
      <motion.div className=" w-[90%] sm:w-[85%] mx-auto mb-16 flex flex-col sm:items-center text-center gap-2" variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Active <span className="text-purple-600 drop-shadow-sm">Campaigns</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 sm:text-base">
          Discover meaningful causes and make a difference in someone's life today.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div className=" w-[90%] sm:w-[85%] mx-auto flex flex-col md:flex-row gap-4 mb-10" variants={itemVariants}>
        {/* Search Box */}
        <div className="flex items-center border-2 border-green-400 focus-within:border-purple-500 rounded-md px-3 py-2 bg-white dark:bg-[#1a1a2e] w-full transition duration-300">
          <FiSearch className="text-green-500 mr-2" />
          <input
          value={searchtext}
          onChange={(e) => setsearchtext(e.target.value)}
            type="text"
            name="search"
            placeholder="Search campaigns"
            className="bg-transparent outline-none text-sm w-full text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <select
        value={selectcategory}
        onChange={(e) => setselectcategory(e.target.value)}
          aria-label="Category"
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm text-gray-800 dark:text-white w-full md:w-auto transition duration-300"
        >
          <option>Medical</option>
          <option>Education</option>
          <option>Disaster Relief</option>
          <option>Community</option>
          <option>NGO</option>
        </select>

        {/* Sort Filter */}
        <select
        value={sortoptions}
        onChange={(e)=>setsortoptions(e.target.value)}
          aria-label="Sort"
          className="bg-white dark:bg-[#1a1a2e] border-2 border-green-500 rounded-md px-3 py-2 text-sm text-gray-800 dark:text-white w-full md:w-auto transition duration-300"
        >
          <option>Most Recent</option>
          <option>Most Urgent</option>
          <option>Most Funded</option>
        </select>
      </motion.div>  

      {/* Cards Grid */}
      <motion.div
        className=" w-[90%] sm:w-[85%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {filteredCampaigns.map((card) => (
          <motion.div key={card.id} variants={itemVariants}>
            <Suspense fallback={<div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}>
              <CampaignCard card={card} />
            </Suspense>
          </motion.div>
        ))}
      </motion.div>
      <Footer/>
    </motion.div>
  
  );
};

export default CampignExplore;
