// redux/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from './store';
import api from '../CentralAPI/axios';

interface AuthState {
  userId: string | null;
  role: 'admin' | 'user' | null;
  accessToken: string | null;
  loading: boolean;
}

const initialState: AuthState = { userId: null, role: null, accessToken: null, loading: true };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ role: 'admin' | 'user'; userId: string; accessToken: string }>) => {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    clearAuth: (state) => {
      state.role = null;
      state.userId = null;
      state.accessToken = null;
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
    const { data } = await api.get('/auth/refresh-token'); // refresh token sent automatically via cookie
    if (data?.accessToken && data?.role && data?.userId) {
      dispatch(setAuth({
        accessToken: data.accessToken,
        role: data.role,
        userId: data.userId
      }));
    } else {
      dispatch(clearAuth());
    }
  } catch (err) {
    console.log(err, "error in check session ");
    dispatch(clearAuth());
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await api.post('/auth/logout'); // clears refresh token cookie + Redis session
  } catch (err) {
    console.warn('Logout failed:', err);
  } finally {
    dispatch(clearAuth());
  }
};

export default authSlice.reducer;
