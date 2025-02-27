import { Dispatch, SetStateAction } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { recordLogin } from '../utils/recordUserLogin';
import * as Sentry from "@sentry/browser";

/**
 * Get the initial session for the user
 * @param setSession Function to set the session state
 * @param setLoading Function to set the loading state
 */
export const getInitialSessionUtil = async (
  setSession: Dispatch<SetStateAction<Session | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      Sentry.captureException(error);
      return;
    }
    
    setSession(session);
    
    // Record login if we have a session
    if (session?.user?.email) {
      try {
        await recordLogin(session.user.email);
      } catch (error) {
        console.error('Failed to record login:', error);
        Sentry.captureException(error);
      }
    }
  } catch (error) {
    console.error('Error in getInitialSession:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
};

/**
 * Subscribe to auth state changes
 * @param setSession Function to set the session state
 * @param setLoading Function to set the loading state
 * @returns Subscription object
 */
export const subscribeAuthStateChangeUtil = (
  setSession: Dispatch<SetStateAction<Session | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setLoading(false);
        
        // Record login on sign in event
        if (event === 'SIGNED_IN' && session?.user?.email) {
          try {
            await recordLogin(session.user.email);
          } catch (error) {
            console.error('Failed to record login on state change:', error);
            Sentry.captureException(error);
          }
        }
      }
    );
    
    return { subscription };
  } catch (error) {
    console.error('Error subscribing to auth state change:', error);
    Sentry.captureException(error);
    return { subscription: null };
  }
};