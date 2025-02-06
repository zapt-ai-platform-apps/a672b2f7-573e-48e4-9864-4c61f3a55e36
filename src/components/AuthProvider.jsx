import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import { processSession } from '../utils/authHelpers.js';
import { Auth } from '@supabase/auth-ui-react';

const AuthContext = createContext();

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-10 py-8 max-w-md w-full">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png"
            alt="Football Subs Logo"
            className="h-16 w-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Football Subs</h2>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'facebook', 'apple']}
            appearance={{
              theme: {
                base: 'light',
                variables: {
                  color: {
                    brand: '#0ea5e9'
                  }
                }
              }
            }}
            theme="light"
          />
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };