import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from './store';
import { refreshToken as apiRefreshToken } from '../hooks/auth/uselogin';

export type Role = 'donor' | 'funder' | null;

interface AuthState {
  role: Role;
  loading: boolean;
}

const initialState: AuthState = { role: null, loading: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.role = null;
      state.loading = false;
      localStorage.removeItem('role');
    },
  },
});

export const { setRole, setLoading, logout } = authSlice.actions;

// Check session and refresh token
export const checkSession = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await apiRefreshToken();
      if (data?.role) dispatch(setRole(data.role));
      else dispatch(logout());
    } catch {
      dispatch(logout());
    }
  };
};

export default authSlice.reducer;
