import React from 'react';
import type { Player } from '../../../types/GameTypes';

interface PlayerListProps {
  players: Player[];
  title: string;
  emptyMessage: string;
  selectedPlayer: Player | null;
  onPlayerClick: (player: Player) => void;
  timeFormatter: (seconds: number) => string;
  getTotalPlayTime: (player: Player) => number;
  selectedItemClass: string;
  defaultItemClass: string;
  showGoalkeeper?: boolean;
}

function PlayerList({
  players,
  title,
  emptyMessage,
  selectedPlayer,
  onPlayerClick,
  timeFormatter,
  getTotalPlayTime,
  selectedItemClass,
  defaultItemClass,
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