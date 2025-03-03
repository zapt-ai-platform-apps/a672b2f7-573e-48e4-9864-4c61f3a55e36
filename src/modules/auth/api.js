import { useState, useEffect } from 'react';
import { supabase, recordLogin } from '@/supabaseClient';
import { eventBus } from '@/modules/core/events';
import { events } from './events';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(data.session);
        
        if (data.session?.user?.email) {
          try {
            await recordLogin(data.session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
          } catch (error) {
            console.error('Failed to record login:', error);
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (event === 'SIGNED_IN' && session?.user?.email) {
        try {
          await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
        } catch (error) {
          console.error('Failed to record login:', error);
        }
        
        eventBus.publish(events.USER_SIGNED_IN, { user: session.user });
      }
      
      if (event === 'SIGNED_OUT') {
        eventBus.publish(events.USER_SIGNED_OUT, {});
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
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