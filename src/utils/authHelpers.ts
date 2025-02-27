import { recordLogin } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { environmentType } from '../types/environment';

/**
 * Processes the authentication session and updates user state.
 * Also records the login event (only once per user per session).
 *
 * @param session - The session object returned by Supabase Auth.
 * @param setUser - A function to update the user state.
 */
export function processSession(session: any, setUser: (user: any) => void): void {
  if (session && session.user) {
    const user = session.user;
    setUser(user);
    const recordedKey = `recordedLogin_${user.id}`;
    if (!sessionStorage.getItem(recordedKey) && user.email) {
      // Convert 'staging' to 'production' for recordLogin
      const effectiveEnv = import.meta.env.VITE_PUBLIC_APP_ENV === 'staging' ? 'production' : import.meta.env.VITE_PUBLIC_APP_ENV;
      recordLogin(user.email, effectiveEnv as environmentType)
        .catch((error: any) => {
          console.error('Failed to record login:', error);
          Sentry.captureException(error);
        });
      sessionStorage.setItem(recordedKey, 'true');
    }
  } else {
    setUser(null);
  }
}