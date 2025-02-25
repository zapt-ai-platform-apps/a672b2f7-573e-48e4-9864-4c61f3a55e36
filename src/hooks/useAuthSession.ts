import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase, recordLogin } from '../supabaseClient';

function useAuthSession() {
  const [session, setSession] = useState(null);
  const [loginRecorded, setLoginRecorded] = useState(false);

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

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setLoginRecorded(false);
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

  return { session, setSession, signOut };
}

export default useAuthSession;