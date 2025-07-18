import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/useTheme';
import { FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { FiSun, FiMoon } from 'react-icons/fi';


const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-[#030918] dark:text-white border-b shadow-md py-2">
      <div className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 ">
          <div className='bg-[#B462E7] p-2 rounded-[7px]'>
            <FiHeart className=" text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-transparent sm:text-2xl bg-clip-text bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7]">
            DonateHope
          </span>
        </div>

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-2xl hover:opacity-80 transition rounded-[6px] cursor-pointer bg p-1 mr-2 border-2 border-purple-600 dark:border-purple-900 "
          >
            {isDark ? <FiSun className='text-purple-600'/> : <FiMoon className='text-purple-600'/>}
          </button>

          <Link
            to="/login"
            className="text-xl font-medium text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition  px-4 py-0.5 rounded-[6px]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-1 text-xl rounded-md text-white bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7] hover:opacity-90 transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-2xl hover:opacity-80 transition rounded-[6px] bg p-1 cursor-pointer "
          >
            {isDark ? <FiSun className='text-purple-600'/> : <FiMoon className='text-purple-600'/>}
          </button>

          <button type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu  className='text-purple-600' />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-xl w-[100%] font-medium text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block  py-1 w-[100%]  font-medium  text-xl rounded-md  text-gray-800 dark:text-white hover:outline-none hover:bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7] hover:opacity-90 transition"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
