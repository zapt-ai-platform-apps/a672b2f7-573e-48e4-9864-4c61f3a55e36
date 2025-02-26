import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import * as Sentry from '@sentry/browser';

type SetSessionCallback = (session: Session | null) => void;
type SetLoadingCallback = (loading: boolean) => void;

export async function getInitialSessionUtil(
  setSession: SetSessionCallback,
  setLoading: SetLoadingCallback
): Promise<void> {
  try {
    setLoading(true);
    
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      Sentry.captureException(error);
      return;
    }
    
    if (data && data.session) {
      console.log('Initial session loaded.');
      setSession(data.session);
    }
  } catch (error) {
    console.error('Error in getInitialSessionUtil:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
}

export function subscribeAuthStateChangeUtil(
  setSession: SetSessionCallback,
  setLoading: SetLoadingCallback
) {
  try {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Auth state changed: ${event}`);
        setSession(session);
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, session cleared');
        } else if (event === 'SIGNED_IN') {
          console.log('User signed in, session updated');
        }
      }
    );
    
    return authListener;
  } catch (error) {
    console.error('Error setting up auth listener:', error);
    Sentry.captureException(error);
    setLoading(false);
    return null;
  }
}