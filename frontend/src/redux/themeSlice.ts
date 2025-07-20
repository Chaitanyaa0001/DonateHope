import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      // Persist to localStorage
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
      // Apply to DOM immediately
      const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      // Apply to DOM immediately
      const root = document.documentElement;
      if (state.isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
