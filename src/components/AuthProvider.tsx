import React, { ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAuthSession from '../hooks/useAuthSession';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { session, loading, signOut } = useAuthSession();

  const contextValue = {
    session,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;