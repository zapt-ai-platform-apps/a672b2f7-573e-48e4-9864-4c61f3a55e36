import React from 'react';
import { Player } from '../../../types/GameTypes';

interface GoalkeeperSelectorProps {
  startingPlayers: Player[];
  setGoalkeeper: (player: Player | null) => void;
}

const GoalkeeperSelector: React.FC<GoalkeeperSelectorProps> = ({ 
  startingPlayers, 
  setGoalkeeper 
}) => {
  const handleSelectGoalkeeper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === '') {
      setGoalkeeper(null);
      return;
    }
    
    const selectedPlayer = startingPlayers.find(player => player.id === selectedId);
    if (selectedPlayer) {
      setGoalkeeper(selectedPlayer);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="goalkeeper" className="block text-sm font-medium text-gray-700 mb-1">
        Select Goalkeeper
      </label>
      <select
        id="goalkeeper"
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={handleSelectGoalkeeper}
        defaultValue=""
      >
        <option value="">Select a player</option>
        {startingPlayers.map(player => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GoalkeeperSelector;