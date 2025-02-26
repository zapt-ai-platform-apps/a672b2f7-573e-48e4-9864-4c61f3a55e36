import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { subscribeAuthStateChangeUtil, getInitialSessionUtil } from './authSessionUtils';
import * as Sentry from "@sentry/browser";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  let navigate;
  
  try {
    navigate = useNavigate();
  } catch (error) {
    console.warn('useNavigate hook failed, using fallback function. This might happen during testing or when not inside a Router context.');
    navigate = (path: string) => {
      console.warn(`Navigation to "${path}" was attempted but blocked because we're outside Router context`);
    };
  }

  useEffect(() => {
    const initSession = async () => {
      try {
        await getInitialSessionUtil(setSession, setLoading);
        console.log("Initial session loaded");
      } catch (error) {
        console.error("Error loading initial session:", error);
        Sentry.captureException(error);
      }
    };

    initSession();
    const authListener = subscribeAuthStateChangeUtil(setSession, setLoading);
    
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("Signing out...");
      await supabase.auth.signOut();
      console.log("Sign out successful");
      // No need to manually set session as the auth listener will do this
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

  return { session, loading, signOut };
}

// Export default for easier importing in tests
export default useAuthSession;