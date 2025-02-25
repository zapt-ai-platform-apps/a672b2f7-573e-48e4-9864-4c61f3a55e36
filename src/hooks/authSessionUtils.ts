import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import * as Sentry from "@sentry/browser";
import { recordUserLogin, resetRecordedLogin } from '../lib/authRecording';
import { EnvironmentType } from '../types/environment';

export async function getInitialSessionUtil(
  setSession: (session: Session | null) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    setSession(data.session);
    if (data.session?.user?.email) {
      try {
        await recordUserLogin(
          data.session.user.email,
          import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType,
          'Login recorded successfully'
        );
      } catch (recordError) {
        console.error('Failed to record login:', recordError);
        Sentry.captureException(recordError);
      }
    }
  } catch (error) {
    console.error('Error getting session:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
}

export function subscribeAuthStateChangeUtil(
  setSession: (session: Session | null) => void,
  setLoading: (loading: boolean) => void
) {
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    setSession(session);
    setLoading(false);
    if (event === 'SIGNED_IN' && session?.user?.email) {
      try {
        await recordUserLogin(
          session.user.email,
          import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType,
          'Login recorded on auth state change'
        );
      } catch (recordError) {
        console.error('Failed to record login:', recordError);
        Sentry.captureException(recordError);
      }
    }
    if (event === 'SIGNED_OUT') {
      resetRecordedLogin();
    }
  });
  return authListener;
}