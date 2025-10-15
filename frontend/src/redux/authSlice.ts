import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from './store';
import api from '../CentralAPI/axios';

interface AuthState {
  userId: string | null;
  role: 'donor' | 'funder' | null;
  loading: boolean;
}

const initialState: AuthState = { userId: null, role: null, loading: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ role: 'donor' | 'funder'; userId: string }>) => {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.loading = false;
    },
    clearAuth: (state) => {
      state.role = null;
      state.userId = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading } = authSlice.actions;

export const checkSession = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.get('/auth/refresh-token');
    dispatch(setAuth({ role: data.role, userId: data.userId }));
  } catch {
    dispatch(clearAuth());
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await api.post('/auth/logout'); 
  } catch (err) {
    console.warn('Logout API failed:', err);
  } finally {
    localStorage.removeItem('role'); // if you still used it elsewhere
    dispatch(clearAuth());
  }
};

export default authSlice.reducer;
