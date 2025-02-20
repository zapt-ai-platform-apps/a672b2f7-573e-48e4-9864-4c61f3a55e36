import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LandingScreen(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/squads');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to Football Subs</h1>
      <p className="text-xl mb-8">Manage your squad and substitutions with ease.</p>
      <button
        onClick={() => navigate('/login')}
        className="px-8 py-4 bg-green-500 text-white text-xl rounded-full cursor-pointer"
      >
        Get Started
      </button>
    </div>
  );
}