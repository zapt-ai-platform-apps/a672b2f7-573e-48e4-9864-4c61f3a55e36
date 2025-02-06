import React from 'react';
import { supabase } from '../supabaseClient.js';
import { Auth } from '@supabase/auth-ui-react';

export default function LoginPrompt() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 max-w-md w-full">
        <img
          src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png"
          alt="Football Subs Logo"
          className="h-16 w-16 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Football Subs</h2>
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
          appearance={{
            theme: {
              base: 'light',
              variables: {
                default: {
                  buttonBorder: '1px solid #0ea5e9',
                  buttonBorderRadius: '12px',
                  buttonPadding: '0.75rem 1.5rem',
                  buttonBoxShadow: 'none'
                },
                colors: {
                  brand: '#0ea5e9'
                }
              }
            }
          }}
          theme="light"
        />
      </div>
    </div>
  );
}