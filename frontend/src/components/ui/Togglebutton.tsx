// src/components/ThemeToggle.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import { toggleTheme } from '@/redux/themeSlice';
import type { RootState } from '@/redux/store';

const Togglebutton: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <button
    type='button'
      onClick={() => dispatch(toggleTheme())}
      className="p-2 border rounded-full border-purple-700 hover:bg-purple-100 dark:hover:bg-[#1a1733] transition"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun className="text-purple-500" /> : <FiMoon className="text-purple-500" />}
    </button>
  );
};

export default Togglebutton;
