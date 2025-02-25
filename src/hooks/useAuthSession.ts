import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { subscribeAuthStateChangeUtil, getInitialSessionUtil } from './authSessionUtils';
import * as Sentry from "@sentry/browser";

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  let navigate: (path: string) => void;
  try {
    navigate = useNavigate();
  } catch (error) {
    console.warn('useNavigate hook failed, using fallback function. This might happen during testing or when not inside a Router context.');
    navigate = (path: string) => {
      console.warn(`Navigation to "${path}" was attempted but blocked because we're outside Router context`);
    };
  }

  useEffect(() => {
    getInitialSessionUtil(setSession, setLoading);
    const authListener = subscribeAuthStateChangeUtil(setSession, setLoading);
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

  return { session, loading, signOut };
}