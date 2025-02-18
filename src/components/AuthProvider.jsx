import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import { processSession } from '../utils/authHelpers.js';
import LoginPrompt from './LoginPrompt';

const AuthContext = createContext();

/**
 * Authentication provider component that manages user session state.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} The authentication provider that wraps child components.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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
 * @returns {Object} The auth context value, including the user object.
 */
export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };