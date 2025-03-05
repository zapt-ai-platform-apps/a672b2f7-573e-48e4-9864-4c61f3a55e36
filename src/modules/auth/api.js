import { useState, useEffect } from 'react';
import { supabase, recordLogin } from '@/supabaseClient';
import { eventBus } from '@/modules/core/events';
import { events } from './events';
import * as Sentry from '@sentry/browser';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRecordedLogin, setHasRecordedLogin] = useState(false);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(data.session);
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        Sentry.captureException(error);
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);
      
      if (event === 'SIGNED_IN' && session?.user?.email) {
        eventBus.publish(events.USER_SIGNED_IN, { user: session.user });
        // Reset login recording state on new sign in
        setHasRecordedLogin(false);
      }
      
      if (event === 'SIGNED_OUT') {
        eventBus.publish(events.USER_SIGNED_OUT, {});
        // Reset login recording state on sign out
        setHasRecordedLogin(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Separate effect for recording logins
  useEffect(() => {
    const recordUserLogin = async () => {
      if (session?.user?.email && !hasRecordedLogin) {
        try {
          console.log('Recording login for:', session.user.email);
          await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
          setHasRecordedLogin(true);
        } catch (error) {
          console.error('Failed to record login:', error);
          Sentry.captureException(error);
        }
      }
    };

    recordUserLogin();
  }, [session, hasRecordedLogin]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
      throw error;
    }
  };

  return {
    session,
    user: session?.user || null,
    loading,
    signOut,
  };
}