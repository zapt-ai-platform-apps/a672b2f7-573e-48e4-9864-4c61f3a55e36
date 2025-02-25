import React from 'react';
import type { Player } from '../../../types/GameTypes';

interface PlayerListProps {
  players: Player[];
  title: string;
  emptyMessage: string;
  onPlayerClick: (player: Player) => void;
  getTotalPlayTime: (player: Player) => number;
  selectedPlayer?: Player | null;
  timeFormatter?: (seconds: number) => string;
  selectedItemClass?: string;
  defaultItemClass?: string;
  showGoalkeeper?: boolean;
}

function PlayerList({
  players,
  title,
  emptyMessage,
  onPlayerClick,
  getTotalPlayTime,
  selectedPlayer = null,
  timeFormatter = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`,
  selectedItemClass = "bg-blue-100 dark:bg-blue-900",
  defaultItemClass = "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600",
  showGoalkeeper = false
}: PlayerListProps): JSX.Element {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto p-1">
        {players.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">{emptyMessage}</p>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center ${
                selectedPlayer?.id === player.id ? selectedItemClass : defaultItemClass
              }`}
              onClick={() => onPlayerClick(player)}
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {player.name} {showGoalkeeper && player.isGoalkeeper ? '(GK)' : ''}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {timeFormatter(getTotalPlayTime(player))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlayerList;