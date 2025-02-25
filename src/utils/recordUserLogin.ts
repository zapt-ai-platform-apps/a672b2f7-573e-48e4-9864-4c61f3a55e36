import * as Sentry from '@sentry/browser';
import { recordLogin } from '../supabaseClient';
import { environmentType } from '../types/environment';

async function recordUserLogin(email: string, getLoginRecorded: () => boolean, recordingInProgress: { current: boolean }, setLoginRecorded: (value: boolean) => void): Promise<void> {
  if (getLoginRecorded() || recordingInProgress.current || !email) {
    return;
  }
  
  recordingInProgress.current = true;
  
  try {
    // Cast the environment to the expected type
    await recordLogin(email, import.meta.env.VITE_PUBLIC_APP_ENV as unknown as environmentType);
    setLoginRecorded(true);
  } catch (error) {
    console.error('Failed to record login:', error);
    Sentry.captureException(error);
  } finally {
    recordingInProgress.current = false;
  }
}

export default recordUserLogin;