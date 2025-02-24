import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../../state';
import { useStartingLineup } from './useStartingLineup';
import PlayerCard from './PlayerCard';

export default function StartingLineup(): JSX.Element {
  const { startingPlayers, setStartingPlayer } = useStartingLineup();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleContinue = (): void => {
    const selectedStartingPlayers = startingPlayers.filter(player => player.isStartingPlayer);
    
    if (selectedStartingPlayers.length < 1) {
      setError('Please select at least one starting player');
      return;
    }
    
    navigate('/setup/configuration');
  };

  const handleBack = (): void => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Select Starting Lineup</h1>
        <p className="text-lg text-white/90 mb-6">Choose which players will start the game</p>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {startingPlayers.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={player.isStartingPlayer}
              onToggle={() => setStartingPlayer(String(player.id), !player.isStartingPlayer)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-md transition-colors cursor-pointer backdrop-blur-sm"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl rounded-xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Continue to Game Setup →
          </button>
        </div>
      </div>
    </div>
  );
}