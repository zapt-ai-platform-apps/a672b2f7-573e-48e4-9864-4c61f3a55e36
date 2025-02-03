import React from 'react';
import { useAuth } from './AuthProvider.jsx';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;