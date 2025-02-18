/**
 * ProtectedRoute component restricts access to authenticated users.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render if authenticated.
 * @returns {JSX.Element} The rendered child components or redirects to login.
 */
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

  // Allow navigation for routes starting with '/squads' or '/setup'
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