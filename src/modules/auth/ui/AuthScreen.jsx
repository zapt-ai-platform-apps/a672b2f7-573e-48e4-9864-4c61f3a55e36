import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/api';

function AuthScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  React.useEffect(() => {
    if (user) {
      navigate('/squads');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=128&height=128"
            alt="Football Subs Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Football Subs</h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Sign in to manage your teams and games
          </p>
          <div className="w-full mt-4 flex justify-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-500 hover:underline text-lg"
            >
              Sign in with ZAPT
            </a>
          </div>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#10b981',
                  brandAccent: '#059669',
                },
              },
            },
          }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
        />
      </div>
    </div>
  );
}

export default AuthScreen;