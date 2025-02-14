import React from 'react';

export default function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Goalkeeper Settings</h2>
      <select
        value={goalkeeper}
        onChange={(e) => setGoalkeeper(e.target.value)}
        className="w-full p-3 border rounded-lg cursor-pointer"
      >
        <option value="">Select Goalkeeper</option>
        {startingPlayers.map((player) => (
          <option key={player.id} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
      <label className="flex items-center mt-4 space-x-3">
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
          className="w-5 h-5 cursor-pointer"
        />
        <span className="text-gray-700">Include Goalkeeper Playtime in Totals</span>
      </label>
    </div>
  );
}