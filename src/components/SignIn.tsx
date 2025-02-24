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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 px-4 py-8">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Football Subs</h1>
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Sign in with ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-6 text-blue-600 hover:text-blue-800 underline text-center transition-colors duration-200 cursor-pointer"
        >
          Visit ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          showLinks={true}
          view="magic_link"
          appearance={{
            theme: 'default',
            variables: {
              default: {
                colors: {
                  brand: '#4F46E5',
                  brandAccent: '#6366F1',
                },
                borderRadii: {
                  button: '0.5rem',
                  input: '0.5rem',
                }
              }
            },
            className: {
              button: 'cursor-pointer',
              input: 'box-border'
            }
          }}
        />
      </div>
    </div>
  );
}