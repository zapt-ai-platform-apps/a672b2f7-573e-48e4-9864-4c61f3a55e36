import React from 'react';
import GoalkeeperSelect from './GoalkeeperSelect';
import GKPlaytimeToggle from './GKPlaytimeToggle';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const startingPlayersFiltered = startingPlayers.filter(player => player.isStartingPlayer);
    const selectedPlayer = startingPlayersFiltered.find(player => String(player.id) === selectedId) || null;
    setGoalkeeper(selectedPlayer);
  };

  const handleCheckboxChange = (e) => {
    setIncludeGKPlaytime(e.target.checked);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Goalkeeper Configuration</h2>
      
      <div className="space-y-6">
        <GoalkeeperSelect
          startingPlayers={startingPlayers}
          goalkeeper={goalkeeper}
          onChange={handleSelectChange}
        />
        <GKPlaytimeToggle
          includeGKPlaytime={includeGKPlaytime}
          onToggle={handleCheckboxChange}
        />
      </div>
    </div>
  );
}