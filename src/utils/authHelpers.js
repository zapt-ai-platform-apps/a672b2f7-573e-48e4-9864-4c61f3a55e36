import { recordLogin, supabase } from '../supabaseClient.js';

export function processSession(session, setUser) {
  if (session && session.user) {
    setUser(session.user);
    if (session.user.email) {
      recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV)
        .catch((error) => {
          console.error('Failed to record login:', error);
        });
    }
  } else {
    setUser(null);
  }
}