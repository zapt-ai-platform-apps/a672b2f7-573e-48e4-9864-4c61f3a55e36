import React from 'react';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import authAppearance from '../config/authAppearance';

interface AuthCardProps {
  navigate: (path: string) => void;
}

export default function AuthCard({ navigate }: AuthCardProps): JSX.Element {
  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
        <div className="flex justify-center mb-6">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=80&height=80"
            alt="Football Subs Logo"
            className="h-20 w-20 mb-4"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Welcome to Football Subs
        </h2>

        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-200">Sign in with ZAPT</h3>
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 underline text-sm transition-colors duration-200 cursor-pointer"
          >
            Visit ZAPT.ai →
          </a>
        </div>

        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          showLinks={true}
          view="magic_link"
          appearance={authAppearance}
        />

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-200 hover:text-white transition-colors flex items-center justify-center mx-auto gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}