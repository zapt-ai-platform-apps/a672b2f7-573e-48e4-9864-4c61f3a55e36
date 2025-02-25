import { useState, useEffect, useRef } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from '../supabaseClient';
import { Session } from '../context/AuthContext';
import recordUserLogin from '../utils/recordUserLogin';

function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginRecorded, setLoginRecorded] = useState<boolean>(false);
  const recordingInProgress = useRef<boolean>(false);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session as Session | null);
        if (session?.user?.email) {
          recordUserLogin(session.user.email, () => loginRecorded, recordingInProgress, setLoginRecorded);
        }
      })
      .catch((error) => {
        console.error('Error getting session:', error);
        Sentry.captureException(error);
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session as Session | null);
      if (event === 'SIGNED_IN' && session?.user?.email) {
        recordUserLogin(session.user.email, () => loginRecorded, recordingInProgress, setLoginRecorded);
      } else if (event === 'SIGNED_OUT') {
        setLoginRecorded(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  return { session, loading, setSession, signOut };
}

export default useAuthSession;