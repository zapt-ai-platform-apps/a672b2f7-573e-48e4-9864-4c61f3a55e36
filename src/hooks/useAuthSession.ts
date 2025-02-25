import { useState, useEffect, useRef } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase, recordLogin } from '../supabaseClient';

/**
 * Hook to manage authentication session
 * @returns Session state and authentication functions
 */
function useAuthSession() {
  const [session, setSession] = useState(null);
  const [loginRecorded, setLoginRecorded] = useState(false);
  const recordingInProgress = useRef(false);

  /**
   * Records user login - ensures login is only recorded once
   * @param email User's email address
   */
  const recordUserLogin = async (email: string) => {
    if (loginRecorded || recordingInProgress.current || !email) {
      return;
    }
    
    recordingInProgress.current = true;
    
    try {
      await recordLogin(email, import.meta.env.VITE_PUBLIC_APP_ENV);
      setLoginRecorded(true);
    } catch (error) {
      console.error('Failed to record login:', error);
      Sentry.captureException(error);
    } finally {
      recordingInProgress.current = false;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        if (session?.user?.email) {
          recordUserLogin(session.user.email);
        }
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        Sentry.captureException(error);
      });

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' && session?.user?.email) {
        recordUserLogin(session.user.email);
      } else if (event === 'SIGNED_OUT') {
        setLoginRecorded(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Signs the user out
   */
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