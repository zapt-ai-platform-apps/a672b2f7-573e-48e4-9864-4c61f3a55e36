import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';
import NavBar from './navigation/NavBar';

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { session, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('Protected route check:', {
      path: location.pathname,
      hasSession: !!session,
      isLoading
    });
  }, [session, location.pathname, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}