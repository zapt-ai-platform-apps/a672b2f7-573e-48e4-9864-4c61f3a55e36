/**
 * LoginPrompt component renders the authentication UI for user login via Supabase Auth using magic link.
 *
 * @returns {JSX.Element} The rendered login prompt UI.
 */
import React from 'react';
import { supabase } from '../supabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF4757]/10 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-lg border-2 border-[#FF6B6B]/30">
        <img
          src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png"
          alt="Football Subs Logo"
          className="h-16 w-16 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome to Football Subs
        </h2>
        <p className="text-center text-xl mb-6">
          Sign in with{' '}
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline cursor-pointer"
          >
            ZAPT
          </a>
        </p>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          showLinks={true}
          view="magic_link"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                brand: '#FF6B6B',
                brandAccent: '#FF4757',
                buttonBorderRadius: '12px',
                inputBorderRadius: '12px'
              }
            }
          }}
        />
      </div>
    </div>
  );
}
