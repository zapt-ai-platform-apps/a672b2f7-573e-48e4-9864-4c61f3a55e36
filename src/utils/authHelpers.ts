import { recordLogin } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import { EnvironmentType } from '../types/environment';

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
      // First cast env value to EnvironmentType
      const appEnv = import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType;
      // Then compute effectiveEnv without further casting needed
      const effectiveEnv = appEnv === 'staging' ? 'production' : appEnv;
      
      recordLogin(user.email, effectiveEnv)
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