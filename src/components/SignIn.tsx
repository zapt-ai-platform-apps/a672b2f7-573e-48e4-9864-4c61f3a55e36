import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { session } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (session) {
      navigate('/squads');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign in with ZAPT</h2>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 text-blue-600 underline"
      >
        Visit ZAPT
      </a>
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
        appearance={{
          theme: 'default'
        }}
      />
    </div>
  );
}