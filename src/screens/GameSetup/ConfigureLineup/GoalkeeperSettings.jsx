import React from 'react';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Goalkeeper Settings</h2>
      <select
        value={goalkeeper}
        onChange={(e) => setGoalkeeper(e.target.value)}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer box-border text-lg dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Goalkeeper</option>
        {startingPlayers.map((player) => (
          <option key={player.id} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={() => setIncludeGKPlaytime(!includeGKPlaytime)}
          className="mr-2 cursor-pointer w-6 h-6"
        />
        <label className="text-gray-800 dark:text-gray-200 text-lg">
          {includeGKPlaytime ? 'Include' : 'Exclude'} Goalkeeper Playtime
        </label>
      </div>
    </div>
  );
}