import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@/redux/store';
import type { JSX, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'donor' | 'funder';
}

const ProtectedRoutes = ({ role, children }: ProtectedRouteProps): JSX.Element => {
  const { role: currentRole, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div className="text-center mt-20">Loading session...</div>;

  if (!currentRole) return <Navigate to="/login" replace />;
  if (currentRole !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
