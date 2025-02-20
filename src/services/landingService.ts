import { supabase, recordLogin } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function runGetStarted(
  navigate: (path: string) => void,
  setIsButtonDisabled: (isDisabled: boolean) => void
): Promise<void> {
  setIsButtonDisabled(true);
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    if (!session || !session.user) {
      navigate('/login');
    } else {
      const user = session.user;
      if (user.email && !sessionStorage.getItem('recordLoginCalled')) {
        try {
          await recordLogin(user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
          sessionStorage.setItem('recordLoginCalled', 'true');
        } catch (loginError) {
          console.error('Failed to record login:', loginError);
          Sentry.captureException(loginError);
        }
      }
      navigate('/setup/participants');
    }
  } catch (error) {
    console.error('Error on Get Started:', error);
    Sentry.captureException(error);
  } finally {
    setIsButtonDisabled(false);
  }
}