import { recordLogin, supabase } from '../supabaseClient';

let recordedEmail: string | null = null;

/**
 * Processes the Supabase session to update user state and record a user login.
 *
 * @param session - The Supabase session object.
 * @param setUser - Function to update the user state.
 */
export function processSession(session: any, setUser: (user: any) => void): void {
  if (session && session.user) {
    setUser(session.user);
    const userEmail = session.user.email;
    if (userEmail && recordedEmail !== userEmail) {
      recordLogin(userEmail, import.meta.env.VITE_PUBLIC_APP_ENV as string)
        .then(() => {
          recordedEmail = userEmail;
        })
        .catch((error) => {
          console.error('Failed to record login:', error);
        });
    }
  } else {
    setUser(null);
    recordedEmail = null;
  }
}