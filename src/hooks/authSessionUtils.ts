import { useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { recordUserLogin as recordLogin } from '../utils/recordUserLogin';
import { EnvironmentType } from '../types/environment';
import * as Sentry from '@sentry/browser';

/**
 * Initializes an auth session and sets up a session listener
 * @param setSession Function to set the session state
 * @param setUser Function to set the user state
 * @param setIsLoading Function to set the loading state
 */
export const initAuthSession = async (
  setSession: (session: Session | null) => void,
  setUser: (user: any) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    setIsLoading(true);
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    setSession(session);
    
    if (session?.user) {
      setUser(session.user);
      // Fix: Cast environment to EnvironmentType when calling recordLogin
      await recordLogin(session.user.email as string, import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType);
    }
    
    const { data: { subscription } } = await supabase.auth.onAuthStateChange(
      (_event, updatedSession) => {
        setSession(updatedSession);
        setUser(updatedSession?.user ?? null);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error initializing auth session:', error);
  } finally {
    setIsLoading(false);
  }
};

/**
 * Handles user sign in
 * @param email User email
 * @param password User password
 * @param provider Auth provider (optional)
 * @param navigate Navigation function
 * @param redirectTo Redirect path after successful sign in
 */
export const handleSignIn = async (
  email: string,
  password: string,
  provider: string | null = null,
  navigate: ReturnType<typeof useNavigate>,
  redirectTo: string = '/'
) => {
  try {
    let signInResult;
    
    if (provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
      });
      
      if (error) throw error;
      signInResult = { data, error };
    } else {
      signInResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInResult.error) throw signInResult.error;
      
      // Fix: Cast environment to EnvironmentType when calling recordLogin
      await recordLogin(email, import.meta.env.VITE_PUBLIC_APP_ENV as EnvironmentType);
      navigate(redirectTo);
    }
    
    return signInResult;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Handles user sign out
 * @param navigate Navigation function
 * @param redirectTo Redirect path after successful sign out
 */
export const handleSignOut = async (
  navigate: ReturnType<typeof useNavigate>,
  redirectTo: string = '/'
) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate(redirectTo);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Custom hook to handle auth session persistence across page reloads
 * @param setSession Function to set the session state
 * @param setUser Function to set the user state
 * @param setIsLoading Function to set the loading state
 */
export const useAuthSessionPersistence = (
  setSession: (session: Session | null) => void,
  setUser: (user: any) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const setupSession = async () => {
      const cleanup = await initAuthSession(setSession, setUser, setIsLoading);
      unsubscribe = cleanup;
    };
    
    setupSession();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setSession, setUser, setIsLoading]);
};

/**
 * Custom hook that handles magic link authentication
 * @param callbackUrl The URL to redirect to after authentication
 */
export const useMagicLinkAuth = (callbackUrl: string) => {
  const handleMagicLinkSignIn = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: callbackUrl,
        },
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error with magic link sign in:', error);
      return { success: false, error };
    }
  }, [callbackUrl]);
  
  return { handleMagicLinkSignIn };
};

// New exports to support useAuthSession
export const getInitialSessionUtil = async (
  setSession: (session: Session | null) => void,
  setIsLoading: (flag: boolean) => void
) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    throw error;
  }
};

export const subscribeAuthStateChangeUtil = (
  setSession: (session: Session | null) => void,
  setIsLoading: (flag: boolean) => void
) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_, updatedSession) => {
    setSession(updatedSession);
    setIsLoading(false);
  });
  return { subscription };
};