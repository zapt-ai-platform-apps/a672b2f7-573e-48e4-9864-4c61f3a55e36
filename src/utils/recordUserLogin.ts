import { supabase, recordLogin as recordLoginFromClient } from '../supabaseClient';
import { hasLoggedInRecently } from '../lib/authRecording';
import { EnvironmentType } from '../types/environment';

/**
 * Records a user login event
 * @param email The email address of the user logging in (optional)
 * @param environment The current environment the app is running in (optional)
 */
export const recordUserLogin = async (email?: string, environment?: EnvironmentType): Promise<void> => {
  try {
    // If email is not provided, retrieve the current user via Supabase
    if (!email) {
      const { data: { user } } = await supabase.auth.getUser();
      email = user?.email;
      if (!email) return; // If no email available, do nothing
    }

    // Use VITE_PUBLIC_APP_ENV if environment is not provided
    if (!environment) {
      environment = import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType;
    }

    // Compute effective environment - map 'staging' to 'production'
    const effectiveEnv = environment === 'staging' ? 'production' : environment;

    if (!hasLoggedInRecently(email)) {
      console.log(`Recording login for user: ${email} in environment: ${environment} (effective: ${effectiveEnv})`);
      await recordLoginFromClient(email, effectiveEnv);
    } else {
      console.log(`User ${email} already logged in recently, skipping login record`);
    }
  } catch (error) {
    console.error('Failed to record login:', error);
  }
};