import React, { useEffect, useState } from 'react';
import * as Sentry from "@sentry/browser";
import { AuthContext } from '../context/AuthContext';
import { supabase, recordLogin } from '../supabaseClient';
import SignIn from './SignIn';

export { useAuth } from '../context/AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, setSession] = useState<any>(null);
  const [loginRecorded, setLoginRecorded] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        if (session?.user?.email && !loginRecorded) {
          recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
            .then(() => setLoginRecorded(true))
            .catch((error) => {
              console.error('Failed to record login:', error);
              Sentry.captureException(error);
            });
        }
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        Sentry.captureException(error);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' && session?.user?.email && !loginRecorded) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
          .then(() => setLoginRecorded(true))
          .catch((error) => {
            console.error('Failed to record login:', error);
            Sentry.captureException(error);
          });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [loginRecorded]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setLoginRecorded(false);
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <div className="min-h-screen">
        {session && (
          <div className="p-4 flex justify-end">
            <button
              onClick={handleSignOut}
              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        )}
        {children}
      </div>
    </AuthContext.Provider>
  );
}