import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStartingLineup from './useStartingLineup';
import PlayerCard from './PlayerCard';
import { useStateContext } from '../../../../hooks/useStateContext';

export default function StartingLineup(): JSX.Element {
  const { startingPlayers, toggleStartingPlayer } = useStartingLineup();
  const { matchSquad } = useStateContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Current matchSquad in StartingLineup:', matchSquad);
    console.log('startingPlayers in StartingLineup:', startingPlayers);
    
    if (!matchSquad || matchSquad.length === 0) {
      setError('No players available. Please go back and select participants.');
    } else if (startingPlayers.length === 0) {
      setError('Failed to load players. Please try again or go back to select participants.');
    } else {
      setError('');
    }
  }, [matchSquad, startingPlayers]);

  const handleContinue = (): void => {
    const validPlayers = startingPlayers.filter(player => player && typeof player.id === 'string');
    const selectedStartingPlayers = validPlayers.filter(player => player.selected);
    
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
        
        {error && (
          <div className="p-4 mb-6 bg-red-500/20 border border-red-500 rounded-lg text-white">
            <p>{error}</p>
          </div>
        )}
        
        {startingPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {startingPlayers
              .filter(player => player && typeof player.id === 'string')
              .map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={player.selected}
                  onToggle={() => toggleStartingPlayer(player.id)}
                />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white/10 rounded-lg">
            {matchSquad && matchSquad.length > 0 ? (
              <p className="text-lg text-white/70">Loading players...</p>
            ) : (
              <p className="text-lg text-white/70">No players available. Please go back and select participants first.</p>
            )}
          </div>
        )}
        
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
            disabled={startingPlayers.length === 0}
          >
            Continue to Game Setup →
          </button>
        </div>
      </div>
    </div>
  );
}