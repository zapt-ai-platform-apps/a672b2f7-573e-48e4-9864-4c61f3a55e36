import { recordLogin, supabase } from '../supabaseClient.js';

let recordedEmail = null;

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