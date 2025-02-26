import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStartingLineup from './useStartingLineup';
import PlayerCard from './PlayerCard';
import { useStateContext } from '../../../../hooks/useStateContext';
import GoalkeeperSelect from '../GoalkeeperSelect';
import { Player } from '../../../../types/GameTypes';

export default function StartingLineup(): JSX.Element {
  const { startingPlayers, selectedPlayers, toggleStartingPlayer } = useStartingLineup();
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const { matchSquad, setMatchSquad } = useStateContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log('Current matchSquad in StartingLineup:', matchSquad);
    console.log('startingPlayers in StartingLineup:', startingPlayers);
    console.log('Selected players:', selectedPlayers);
    
    if (!matchSquad || matchSquad.length === 0) {
      setError('No players available. Please go back and select participants.');
    } else if (startingPlayers.length === 0) {
      setError('Failed to load players. Please try again or go back to select participants.');
    } else {
      setError('');
    }
  }, [matchSquad, startingPlayers, selectedPlayers]);

  const handleContinue = (): void => {
    setShowError(false);
    
    if (selectedPlayers.length < 1) {
      setError('Please select at least one starting player');
      setShowError(true);
      return;
    }
    
    if (!goalkeeper && selectedPlayers.length > 0) {
      setError('Please select a goalkeeper');
      setShowError(true);
      return;
    }
    
    // Update matchSquad with selection information before navigating
    const updatedMatchSquad = matchSquad.map(player => {
      const isSelected = selectedPlayers.some(p => p.id === player.id);
      const isGoalkeeper = goalkeeper ? goalkeeper.id === player.id : false;
      
      return {
        ...player,
        isStartingPlayer: isSelected,
        isGoalkeeper: isGoalkeeper
      };
    });
    
    console.log("Updating match squad with selection info:", updatedMatchSquad);
    setMatchSquad(updatedMatchSquad);
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
        
        {showError && error && (
          <div className="p-4 mb-6 bg-red-500/20 border border-red-500 rounded-lg text-white animate-fadeIn">
            <p>{error}</p>
          </div>
        )}
        
        {startingPlayers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {startingPlayers
                .filter(player => player && typeof player.id === 'string')
                .map(player => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isSelected={!!player.selected}
                    onClick={() => toggleStartingPlayer(player.id)}
                    onToggle={() => toggleStartingPlayer(player.id)}
                  />
              ))}
            </div>
            
            <div className="my-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Goalkeeper Selection</h3>
              <p className="text-white/80 mb-4">Select one of your starting players to be the goalkeeper</p>
              {selectedPlayers.length > 0 ? (
                <GoalkeeperSelect 
                  players={selectedPlayers} 
                  goalkeeper={goalkeeper} 
                  setGoalkeeper={setGoalkeeper} 
                />
              ) : (
                <p className="text-amber-300">Please select at least one starting player first</p>
              )}
            </div>
          </>
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