import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export function GameSetupStepTwo(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleProceed = async (): Promise<void> => {
    setLoading(true);
    try {
      console.log('Proceeding with game setup configuration...');
      // Add your configuration logic here
    } catch (error) {
      console.error('Error in game setup configuration:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Game Setup: Configuration</h1>
      <p className="text-lg text-white mb-4">Configure your game settings below and proceed.</p>
      <button
        onClick={handleProceed}
        disabled={loading}
        className="cursor-pointer px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-200 transition"
      >
        {loading ? 'Loading...' : 'Proceed'}
      </button>
    </div>
  );
}

export default GameSetupStepTwo;