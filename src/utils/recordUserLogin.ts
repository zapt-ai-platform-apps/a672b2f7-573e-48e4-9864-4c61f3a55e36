import { supabase, recordLogin as recordLoginFromClient } from '../supabaseClient';
import { hasLoggedInRecently } from '../lib/authRecording';
import { EnvironmentType } from '../types/environment';
import * as Sentry from "@sentry/browser";

/**
 * Records a user login event
 * @param email The email address of the user logging in (optional)
 * @param environment The current environment the app is running in (optional)
 */
export const recordUserLogin = async (email?: string, environment?: EnvironmentType): Promise<void> => {
  try {
    // If email is not provided, retrieve the current user via Supabase
    if (!email) {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error getting user:', error);
        return; // Exit early if there's an error getting the user
      }
      
      // Check if user exists and has an email
      if (data?.user?.email) {
        email = data.user.email;
      } else {
        return; // If no email available, do nothing
      }
    }

    // Use VITE_PUBLIC_APP_ENV if environment is not provided
    if (!environment) {
      environment = import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType;
    }

    // Compute effective environment - anything not 'development' is treated as 'production'
    const effectiveEnv = environment === 'development' ? 'development' : 'production';

    if (!hasLoggedInRecently(email)) {
      console.log(`Recording login for user: ${email} in environment: ${effectiveEnv}`);
      await recordLoginFromClient(email, effectiveEnv);
    } else {
      console.log(`User ${email} already logged in recently, skipping login record`);
    }
  } catch (error) {
    console.error('Failed to record login:', error);
    Sentry.captureException(error);
  }
};