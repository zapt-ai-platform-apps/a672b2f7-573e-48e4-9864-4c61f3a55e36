import React from 'react';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Select Goalkeeper:
          <select 
            value={goalkeeper || ""} 
            onChange={(e) => setGoalkeeper(e.target.value)} 
            className="ml-2 p-2 border rounded"
          >
            <option value="">Select</option>
            {startingPlayers.map(player => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={includeGKPlaytime} 
            onChange={(e) => setIncludeGKPlaytime(e.target.checked)} 
            className="mr-2"
          />
          Include Goalkeeper Playtime
        </label>
      </div>
    </div>
  );
}