import React from 'react';
import { Player } from '../../../types/GameTypes';

interface PlayerPlaytimesProps {
  activePlayers: Player[];
  benchPlayers: Player[];
  playerData?: Player[];
  includeGKPlaytime?: boolean;
  getTotalPlayTime?: (player: Player) => number;
  formatTime?: (seconds: number) => string;
}

const PlayerPlaytimes: React.FC<PlayerPlaytimesProps> = ({ activePlayers, benchPlayers }) => {
  // Combine and sort all players by minutes played (descending)
  const allPlayers = [...activePlayers, ...benchPlayers].sort(
    (a, b) => (b.minutesPlayed || 0) - (a.minutesPlayed || 0)
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
        Player Play Times
      </h3>
      <div className="space-y-2">
        {allPlayers.map((player) => (
          <div
            key={player.id}
            data-testid="player-playtime"
            className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <span className="text-gray-700 dark:text-gray-300">
              {player.name}
            </span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {player.minutesPlayed} min
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPlaytimes;