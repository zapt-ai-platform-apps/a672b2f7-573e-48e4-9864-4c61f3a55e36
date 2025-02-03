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

  // Allow access to Squad Management regardless of squad selection
  if (location.pathname !== '/squads' && !selectedSquad) {
    return <Navigate to="/squads" replace />;
  }

  return children;
}

export default ProtectedRoute;