import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { toggleTheme } from '@/redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

const Navbar: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-white dark:bg-[#030918] dark:text-white border-b shadow-md py-2 transition-colors duration-200">
      <div className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className='bg-[#B462E7] p-2 rounded-[7px]'>
            <FiHeart className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-transparent sm:text-2xl bg-clip-text bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7]">
            Pulse watch
          </span>
        </div>

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="text-2xl hover:opacity-80 transition-all duration-200 rounded-[6px] cursor-pointer p-2 mr-2 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun className='text-purple-600 dark:text-purple-400'/> : <FiMoon className='text-purple-600'/>}
          </button>

          <Link
            to="/login"
            className="text-xl font-medium text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 px-4 py-0.5 rounded-[6px]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-1 text-xl rounded-md text-white bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7] hover:opacity-90 transition-opacity duration-200"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="text-2xl hover:opacity-80 transition-all duration-200 rounded-[6px] p-1 cursor-pointer border border-purple-600 dark:border-purple-400"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun className='text-purple-600 dark:text-purple-400'/> : <FiMoon className='text-purple-600'/>}
          </button>

          <button 
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none transition-transform duration-200"
          >
            {menuOpen ? <FiX className="text-gray-800 dark:text-white" /> : <FiMenu className='text-purple-600' />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-[#030918] border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-xl w-full font-medium text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block py-2 w-full font-medium text-xl rounded-md text-gray-800 dark:text-white hover:bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7] hover:text-white transition-all duration-200"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
