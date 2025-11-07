import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '@/redux/authSlice';
// import { Navigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '@/redux/store'; // 👈 Import AppDispatch

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const {loading} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-20">hehe</div>;
//   if (!role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default AppInitializer;
