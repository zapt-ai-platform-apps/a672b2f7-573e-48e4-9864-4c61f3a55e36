import React from 'react';
import { useAuth } from './AuthProvider.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../state';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { selectedSquad } = useStateContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // For routes that are not part of squad management, require a selected squad.
  if (!location.pathname.startsWith('/squads') && !selectedSquad) {
    return <Navigate to="/squads" replace />;
  }

  return children;
}

export default ProtectedRoute;