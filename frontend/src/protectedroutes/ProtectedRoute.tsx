import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@/redux/store';
import type { ReactNode } from 'react';
import Loader from '@/components/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'admin' | 'user';
}

const ProtectedRoutes = ({ role, children }: ProtectedRouteProps) => {
  const { role: currentRole, loading } = useSelector((state: RootState) => state.auth);
  if (loading) return <div className="text-center mt-20"><Loader/></div>;

  if (!currentRole) return <Navigate to="/" replace />;
  if (currentRole !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default ProtectedRoutes;
