import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

export function GameSetupStepTwo(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const configureGame = async () => {
      setLoading(true);
      try {
        console.log('Automatically configuring game setup...');
        // Insert any necessary configuration logic here
        navigate('/game-management');
      } catch (error) {
        console.error('Error in game setup configuration:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    configureGame();
  }, [navigate]);

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium transition-colors cursor-pointer shadow-sm"
      >
        ← Back
      </button>
      
      <h1 className="text-4xl font-bold text-white mb-6">Game Setup: Configuration</h1>
      <p className="text-lg text-white mb-4">
        {loading ? 'Configuring your game settings...' : 'Redirecting to game management...'}
      </p>
    </div>
  );
}

export default GameSetupStepTwo;