import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import authAppearanceConfig from '../config/authAppearance';

type SignInCardProps = {
  navigate: (path: string) => void;
};

export default function SignInCard({ navigate }: SignInCardProps): JSX.Element {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors cursor-pointer flex items-center gap-2"
          aria-label="Back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Home
        </button>
        
        <img 
          src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=48&height=48" 
          alt="Football Subs Logo" 
          className="h-12 w-12"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2 text-white">Football Subs</h1>
      
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-200">Sign in with ZAPT</h2>
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
        appearance={authAppearanceConfig}
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-blue-200">
          By signing in, you agree to our 
          <a href="#" className="text-white ml-1 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-white hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}