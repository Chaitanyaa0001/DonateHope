// hooks/useInitApp.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/redux/themeSlice';

export const useInitApp = () => {
  const dispatch = useDispatch();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme? storedTheme === 'dark': window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    dispatch(setTheme(!!isDark));
  }, [dispatch]);
};
