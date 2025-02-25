import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from './AnimatedBackground';
import SignInCard from './SignInCard';

export default function SignIn(): JSX.Element {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/squads');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4 py-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <SignInCard navigate={navigate} />
      </div>
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white hover:bg-white/20 transition-all duration-300 border border-white/20 z-20"
      >
        Made on ZAPT
      </a>
    </div>
  );
}