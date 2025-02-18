import { recordLogin, supabase } from '../supabaseClient.js';

let recordedEmail = null;

/**
 * Processes the Supabase session to update user state and record a user login.
 *
 * @param {Object} session - The Supabase session object.
 * @param {function} setUser - Function to update the user state.
 */
export function processSession(session, setUser) {
  if (session && session.user) {
    setUser(session.user);
    const userEmail = session.user.email;
    if (userEmail && recordedEmail !== userEmail) {
      recordLogin(userEmail, import.meta.env.VITE_PUBLIC_APP_ENV)
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