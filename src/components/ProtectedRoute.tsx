import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../state';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { session } = useAuth();
  const { selectedSquad } = useStateContext();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (
    !location.pathname.startsWith('/squads') &&
    !location.pathname.startsWith('/setup') &&
    !selectedSquad
  ) {
    return <Navigate to="/squads" replace />;
  }

  return children;
}

export default ProtectedRoute;