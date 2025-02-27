import { EnvironmentType } from '../types/environment';
import { recordLogin as recordLoginFromClient } from '../supabaseClient';
import { hasLoggedInRecently } from '../lib/authRecording';

/**
 * Records a user login event
 * @param email The email address of the user logging in
 * @param environment The current environment the app is running in
 */
export const recordUserLogin = async (email: string, environment: EnvironmentType): Promise<void> => {
  try {
    // Check if this user has logged in recently to avoid duplicate events
    if (!hasLoggedInRecently(email)) {
      console.log(`Recording login for user: ${email} in environment: ${environment}`);
      await recordLoginFromClient(email, environment);
    } else {
      console.log(`User ${email} already logged in recently, skipping login record`);
    }
  } catch (error) {
    console.error('Failed to record login:', error);
  }
};