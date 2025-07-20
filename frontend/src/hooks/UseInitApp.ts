import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRole } from '@/redux/authSlice';
import { setTheme } from '@/redux/themeSlice';

export const useInitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize role
    const storedRole = localStorage.getItem('role') as 'donar' | 'funder' | null;
    if (storedRole) dispatch(setRole(storedRole));

    // Initialize theme
    const storedTheme = localStorage.getItem('theme');
    let isDark = false;
    
    if (storedTheme) {
      isDark = storedTheme === 'dark';
    } else {
      // Check system preference if no stored theme
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    dispatch(setTheme(isDark));
  }, [dispatch]);
};
