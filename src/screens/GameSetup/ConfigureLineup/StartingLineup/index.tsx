import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStartingLineup from './useStartingLineup';
import PlayerCard from './PlayerCard';
import GoalkeeperSelect from '../GoalkeeperSelect';
import ErrorMessage from '../../../../components/ErrorMessage';
import { useStateContext } from '../../../../hooks/useStateContext';
import { Player } from '../../../../types/GameTypes';

/**
 * Starting lineup selection screen
 * @returns Starting lineup component
 */
const StartingLineup: React.FC = () => {
  const navigate = useNavigate();
  const { matchSquad } = useStateContext();
  const { startingPlayers, selectedPlayers, toggleStartingPlayer } = useStartingLineup();
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [error, setError] = useState<string>('');

  const handleContinue = () => {
    if (!goalkeeper) {
      setError('Please select a goalkeeper');
      return;
    }
    
    if (selectedPlayers.length < 5) {
      setError('Please select at least 5 players for the starting lineup');
      return;
    }
    
    // Process selected players and navigate
    navigate('/game-management');
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        ← Back
      </button>
      
      <h1 className="text-2xl font-bold mb-6">Select Starting Lineup</h1>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Goalkeeper</h2>
        <GoalkeeperSelect 
          players={matchSquad || []} 
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-3">Select Starting Players</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {startingPlayers.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            selected={player.selected}
            onClick={toggleStartingPlayer}
          />
        ))}
      </div>
      
      <button
        onClick={handleContinue}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartingLineup;