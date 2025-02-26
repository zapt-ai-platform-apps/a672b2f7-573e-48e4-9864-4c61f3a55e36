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
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
      {players.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-200">{emptyMessage}</p>
      ) : (
        <ul>
          {players.map((player, index) => {
            const isSelected = selectedPlayer && player === selectedPlayer;
            const itemClass = isSelected ? selectedItemClass : defaultItemClass;
            return (
              <li
                key={player.id || index}
                className={`p-2 mb-1 cursor-pointer ${itemClass}`}
                onClick={() => onPlayerClick(player)}
              >
                <div className="text-gray-800 dark:text-white font-medium">{player.name}</div>
                <div className="text-gray-600 dark:text-gray-200">{timeFormatter(getTotalPlayTime(player))}</div>
                {showGoalkeeper && player.isGoalkeeper && (
                  <div className="text-yellow-600 dark:text-yellow-300 font-medium">Goalkeeper</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PlayerList;