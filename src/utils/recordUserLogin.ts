import { createEvent, recordLogin as zapt_recordLogin } from '../supabaseClient';
import * as Sentry from "@sentry/browser";

/**
 * Record a user login event
 * @param email User's email
 * @returns Promise that resolves when login is recorded
 */
export const recordLogin = async (email: string): Promise<void> => {
  try {
    console.log('Recording login for:', email);
    await zapt_recordLogin(email, import.meta.env.VITE_PUBLIC_APP_ENV);
    console.log('Login recorded successfully');
    
    // Also create a login event
    try {
      await createEvent('user.login', { 
        email,
        timestamp: new Date().toISOString(),
        appEnv: import.meta.env.VITE_PUBLIC_APP_ENV
      });
    } catch (createEventError) {
      console.error('Failed to create login event:', createEventError);
      Sentry.captureException(createEventError);
    }
  } catch (error) {
    console.error('Error recording login:', error);
    Sentry.captureException(error);
    throw error;
  }
};