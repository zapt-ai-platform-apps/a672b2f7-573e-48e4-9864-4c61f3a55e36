import * as Sentry from '@sentry/browser';
import { supabase, recordLogin } from '../supabaseClient';

let recordedLoginEmails: Set<string> = new Set();

/**
 * Processes the current Supabase session and sets the user state.
 * Also records the login event if the user hasn't been recorded yet.
 *
 * @param session - The session object from Supabase.
 * @param setUser - Function to update user state.
 */
export async function processSession(session: any, setUser: (user: any) => void): Promise<void> {
  if (session && session.user) {
    setUser(session.user);
    if (session.user.email && !recordedLoginEmails.has(session.user.email)) {
      try {
        await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
        recordedLoginEmails.add(session.user.email);
      } catch (error) {
        console.error('Failed to record login:', error);
        Sentry.captureException(error);
      }
    }
  } else {
    setUser(null);
  }
}