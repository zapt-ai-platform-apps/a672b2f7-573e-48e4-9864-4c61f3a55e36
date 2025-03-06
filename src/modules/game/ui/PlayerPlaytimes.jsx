import React from 'react';
import { formatTime } from '@/modules/game/utils/timeFormatter';

function PlayerPlaytimes({ playerData, includeGKPlaytime, getTotalPlayTime }) {
  const dataArray = Array.isArray(playerData) ? playerData : [];
  const sortedPlayerData = dataArray.sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a));

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-600 dark:text-green-400">Player Playtimes</h2>
      <ul className="space-y-2 md:space-y-3">
        {sortedPlayerData.map((player, index) => (
          <li key={index} className="flex justify-between items-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="font-medium text-base md:text-lg text-gray-800 dark:text-white">{player.name}</div>
            <div className="text-gray-800 dark:text-white text-sm md:text-base">{formatTime(getTotalPlayTime(player))}</div>
          </li>
        ))}
      </ul>
      {!includeGKPlaytime && (
        <p className="mt-3 md:mt-4 text-xs md:text-sm text-gray-700 dark:text-gray-300">
          Note: Playtime for goalkeepers is not included.
        </p>
      )}
    </div>
  );
}

export default PlayerPlaytimes;