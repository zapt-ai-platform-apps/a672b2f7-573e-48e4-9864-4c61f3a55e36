import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, recordLogin } from '../supabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        setUser(session.user);
        if (session.user.email) {
          recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch((error) => {
            console.error('Failed to record login:', error);
          });
        }
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setUser(session.user);
        if (session.user.email) {
          recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch((error) => {
            console.error('Failed to record login:', error);
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Allow public access to the landing page without authentication
  if (location.pathname === "/") {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Sign in with ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 text-blue-500 underline"
        >
          Visit ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    );
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };