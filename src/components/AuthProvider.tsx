import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { processSession } from '../utils/authHelpers';
import LoginPrompt from './LoginPrompt';

interface AuthContextType {
  user: any;
}

const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component that manages user session state.
 *
 * @returns The authentication provider that wraps child components.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      processSession(session, setUser);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      processSession(session, setUser);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (location.pathname === "/") {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access authentication context.
 *
 * @returns The auth context value, including the user object.
 */
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export { AuthContext };