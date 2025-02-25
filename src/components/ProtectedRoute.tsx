import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { session, loading } = useContext(AuthContext);

  if (loading) {
    return <div data-testid="loading-indicator">Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access this feature</div>;
  }

  return children;
};

export default ProtectedRoute;