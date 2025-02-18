import React from 'react';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  const startingPlayersFiltered = startingPlayers.filter(player => player.isStartingPlayer);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedPlayer = startingPlayersFiltered.find(player => String(player.id) === selectedId) || null;
    setGoalkeeper(selectedPlayer);
  };

  const handleCheckboxChange = (e) => {
    setIncludeGKPlaytime(e.target.checked);
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Goalkeeper:</label>
        <select
          value={goalkeeper ? goalkeeper.id : ''}
          onChange={handleSelectChange}
          className="px-3 py-2 border rounded w-full"
        >
          <option value="" disabled>
            Select a player
          </option>
          {startingPlayersFiltered.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={includeGKPlaytime}
            onChange={handleCheckboxChange}
            className="form-checkbox"
          />
          <span className="ml-2">Include GK Playtime</span>
        </label>
      </div>
    </div>
  );
}