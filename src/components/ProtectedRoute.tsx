import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPrompt from './LoginPrompt';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { session, loading } = useAuth();

  if (loading) {
    return <Loading data-testid="loading-indicator" />;
  }

  if (!session) {
    return <LoginPrompt />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;