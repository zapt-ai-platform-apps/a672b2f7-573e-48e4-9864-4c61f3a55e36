import React from 'react';

function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-md shadow-md mb-6 md:mb-8">
      <label className="block font-semibold mb-3 md:mb-4 text-gray-700 dark:text-gray-300 text-base md:text-lg">Select Goalkeeper:</label>
      <select
        className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer box-border text-base md:text-lg dark:bg-gray-700 dark:text-white"
        value={goalkeeper}
        onChange={(e) => setGoalkeeper(e.target.value)}
      >
        <option value="">-- Select Goalkeeper --</option>
        {startingPlayers.map((player, index) => (
          <option key={index} value={player.name}>{player.name}</option>
        ))}
      </select>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={() => setIncludeGKPlaytime(!includeGKPlaytime)}
          className="mr-2 cursor-pointer w-5 h-5 md:w-6 md:h-6"
        />
        <label className="text-gray-800 dark:text-gray-200 text-sm md:text-lg">
          {includeGKPlaytime ? 'Include' : 'Exclude'} Goalkeeper's Playtime in Totals
        </label>
      </div>
    </div>
  );
}

export default GoalkeeperSettings;