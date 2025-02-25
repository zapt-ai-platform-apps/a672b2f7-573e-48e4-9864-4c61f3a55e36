import React from 'react';
import { AuthContext } from '../context/AuthContext';
import useAuthSession from '../hooks/useAuthSession';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { session, loading, setSession, signOut } = useAuthSession();

  return (
    <AuthContext.Provider value={{ session, loading, setSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;