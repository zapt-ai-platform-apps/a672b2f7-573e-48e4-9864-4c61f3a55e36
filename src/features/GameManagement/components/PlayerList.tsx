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
  selectedItemClass?: string;
  defaultItemClass?: string;
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
  selectedItemClass = 'bg-blue-200 dark:bg-blue-900',
  defaultItemClass = 'bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800',
  showGoalkeeper = false
}: PlayerListProps): JSX.Element {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      
      {players.length === 0 ? (
        <p className="text-gray-300 text-center py-4">{emptyMessage}</p>
      ) : (
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id?.toString()}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedPlayer?.id === player.id ? selectedItemClass : defaultItemClass
              }`}
              onClick={() => onPlayerClick(player)}
              data-testid={`player-item-${player.id}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {player.isGoalkeeper && showGoalkeeper && (
                    <span className="mr-2 text-lg">🧤</span>
                  )}
                  <span className="text-black dark:text-white font-medium">{player.name}</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {timeFormatter(getTotalPlayTime(player))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayerList;