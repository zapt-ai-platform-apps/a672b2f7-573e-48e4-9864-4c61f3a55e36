import React from 'react';
import { Player } from '../../../../types/GameTypes';

interface GoalkeeperSelectProps {
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  squadPlayers: Player[];
}

function GoalkeeperSelect({
  goalkeeper,
  setGoalkeeper,
  squadPlayers
}: GoalkeeperSelectProps) {
  const handleSelectGoalkeeper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayerId = e.target.value;
    if (selectedPlayerId === "") {
      setGoalkeeper(null);
    } else {
      const selectedPlayer = squadPlayers.find(player => player.id === selectedPlayerId);
      if (selectedPlayer) {
        setGoalkeeper(selectedPlayer);
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Goalkeeper
      </label>
      <select
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={goalkeeper?.id || ""}
        onChange={handleSelectGoalkeeper}
      >
        <option value="">Select a goalkeeper</option>
        {squadPlayers.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GoalkeeperSelect;