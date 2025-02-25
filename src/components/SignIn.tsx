import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAppearanceConfig } from '../config/authAppearance';

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
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 px-4 py-2 bg-white/80 hover:bg-white rounded-lg text-gray-800 font-medium transition-colors cursor-pointer shadow-sm"
        >
          ← Back
        </button>
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
          appearance={authAppearanceConfig}
        />
      </div>
    </div>
  );
}