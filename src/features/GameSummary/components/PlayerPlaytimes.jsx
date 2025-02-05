import React from 'react';

function PlayerPlaytimes({ playerData, includeGKPlaytime, getTotalPlayTime, formatTime }) {
  const dataArray = Array.isArray(playerData) ? playerData : [];
  const sortedPlayerData = dataArray.sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Player Playtimes</h2>
      <ul>
        {sortedPlayerData.map((player, index) => (
          <li key={index} className="flex justify-between items-center mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="font-medium text-lg text-gray-800 dark:text-white">{player.name}</div>
            <div className="text-gray-800 dark:text-white">{formatTime(getTotalPlayTime(player))}</div>
          </li>
        ))}
      </ul>
      {!includeGKPlaytime && (
        <p className="mt-4 text-gray-700 dark:text-gray-300">Note: Playtime for goalkeepers is not included.</p>
      )}
    </div>
  );
}

export default PlayerPlaytimes;