import * as Sentry from '@sentry/browser';
import { recordLogin } from '../supabaseClient';
import { environmentType } from '../types/environment';

async function recordUserLogin(email: string, getLoginRecorded: () => boolean, recordingInProgress: { current: boolean }, setLoginRecorded: (value: boolean) => void): Promise<void> {
  if (getLoginRecorded() || recordingInProgress.current || !email) {
    return;
  }
  
  recordingInProgress.current = true;
  
  try {
    // Get the environment value
    const environment = import.meta.env.VITE_PUBLIC_APP_ENV as environmentType;
    // Convert 'staging' to 'production' for recordLogin
    const effectiveEnv = (environment === 'staging' ? 'production' : environment) as 'development' | 'production';
    await recordLogin(email, effectiveEnv);
    setLoginRecorded(true);
  } catch (error) {
    console.error('Failed to record login:', error);
    Sentry.captureException(error);
  } finally {
    recordingInProgress.current = false;
  }
}

export default recordUserLogin;