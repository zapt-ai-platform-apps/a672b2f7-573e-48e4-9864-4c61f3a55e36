import { supabase, createEvent, recordLogin as zapt_recordLogin } from '../supabaseClient';
import * as Sentry from "@sentry/browser";
import { environmentType } from '../types/environment';

/**
 * Records a user login event when a user logs in
 * @returns Promise that resolves when the login is recorded
 */
export const recordUserLogin = async (): Promise<void> => {
  try {
    // Get the current user from Supabase auth
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      Sentry.captureException(error);
      return;
    }
    
    if (!user?.email) {
      console.log('No user email available to record login');
      return;
    }
    
    try {
      // Record the login with the user's email
      const appEnv = import.meta.env.VITE_PUBLIC_APP_ENV as environmentType;
      await zapt_recordLogin(user.email, appEnv);
      console.log('Login recorded successfully');
      
      // Create an additional login event
      await createEvent('user.login', { 
        email: user.email,
        timestamp: new Date().toISOString(),
        appEnv: import.meta.env.VITE_PUBLIC_APP_ENV
      });
    } catch (recordError) {
      console.error('Failed to record login:', recordError);
      Sentry.captureException(recordError);
    }
  } catch (error) {
    console.error('Error in recordUserLogin:', error);
    Sentry.captureException(error);
  }
};

// For backwards compatibility with any code using the original function name
export const recordLogin = recordUserLogin;