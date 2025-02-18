import React from 'react';

function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Goalkeeper Settings</h2>
      <div className="mt-4">
        <label className="block mb-2">Choose Goalkeeper:</label>
        <select
          value={goalkeeper || ''}
          onChange={(e) => setGoalkeeper(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Select a goalkeeper</option>
          {startingPlayers.map((player, index) => (
            <option key={index} value={player.name || ''}>
              {player.name || `Player ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
          className="mr-2"
        />
        <span>Include Goalkeeper Playtime</span>
      </div>
    </div>
  );
}

export default GoalkeeperSettings;