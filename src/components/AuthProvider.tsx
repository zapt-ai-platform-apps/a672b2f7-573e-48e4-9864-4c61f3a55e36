import React, { useState, useEffect, ReactNode } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase, recordLogin } from '../supabaseClient';
import { AuthContext, useAuth as useAuthHook } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [loginRecorded, setLoginRecorded] = useState<boolean>(false);

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (currentUser) {
          setUser(currentUser);
          if (currentUser.email && !loginRecorded) {
            try {
              await recordLogin(currentUser.email, import.meta.env.VITE_PUBLIC_APP_ENV);
              setLoginRecorded(true);
            } catch (err) {
              console.error('Failed to record login:', err);
              Sentry.captureException(err);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        Sentry.captureException(error);
      }
    }
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        if (session.user.email && !loginRecorded) {
          try {
            await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
            setLoginRecorded(true);
          } catch (err) {
            console.error('Failed to record login:', err);
            Sentry.captureException(err);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoginRecorded(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [loginRecorded]);

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setLoginRecorded(false);
    } catch (err) {
      console.error('Error signing out:', err);
      Sentry.captureException(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuthHook as useAuth };