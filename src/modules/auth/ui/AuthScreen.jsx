import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/api';
import { Card } from '@/modules/ui/components/Card';

function AuthScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  React.useEffect(() => {
    if (user) {
      navigate('/squads');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=128&height=128"
            alt="Football Subs Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome to Football Subs</h1>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Sign in to manage your teams and games
          </p>
          
          <div className="w-full mt-4 flex justify-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
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
                  brand: '#2aa8eb',
                  brandAccent: '#1c85c8',
                  brandButtonText: 'white',
                  inputLabelText: 'gray',
                  inputText: 'black',
                  inputBorder: 'lightgray',
                  inputBackground: 'white',
                  messageText: 'gray',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '6px',
                  buttonBorderRadius: '6px',
                  inputBorderRadius: '6px',
                },
              },
              dark: {
                colors: {
                  brandButtonText: 'white',
                  inputLabelText: 'gray',
                  inputText: 'white',
                  inputBorder: '#374151',
                  inputBackground: '#1f2937',
                },
              },
            },
            style: {
              button: {
                fontSize: '16px',
                padding: '10px 15px',
                transition: 'all 0.2s ease',
              },
              input: {
                fontSize: '16px',
                padding: '10px 15px',
              },
              label: {
                fontSize: '14px',
                marginBottom: '4px',
              },
              anchor: {
                color: '#2aa8eb',
              },
              message: {
                padding: '10px',
                fontSize: '14px',
                borderRadius: '6px',
              },
            },
          }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
        />
      </Card>
    </div>
  );
}

export default AuthScreen;