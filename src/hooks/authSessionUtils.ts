import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { recordLogin } from '../supabaseClient';
import * as Sentry from "@sentry/browser";
import { environmentType } from '../types/environment';

type SetSessionFunction = (session: Session | null) => void;
type SetLoadingFunction = (loading: boolean) => void;

export const getInitialSessionUtil = async (
  setSession: SetSessionFunction,
  setLoading: SetLoadingFunction
): Promise<void> => {
  try {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    setSession(session);
    
    // Record login if user exists
    if (session?.user?.email) {
      try {
        // Convert 'staging' to 'production' for environment type
        const effectiveEnv = import.meta.env.VITE_PUBLIC_APP_ENV === 'staging' 
          ? 'production' 
          : import.meta.env.VITE_PUBLIC_APP_ENV as environmentType;
          
        await recordLogin(session.user.email, effectiveEnv);
      } catch (error) {
        console.error('Failed to record login:', error);
        Sentry.captureException(error);
      }
    }
  } catch (error) {
    console.error('Error getting session:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
};

export const subscribeAuthStateChangeUtil = (
  setSession: SetSessionFunction,
  setLoading: SetLoadingFunction
) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      setSession(session);
      setLoading(false);
    }
  );
  
  return { subscription };
};