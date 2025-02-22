import React from 'react';
import type { Player } from '../../../context/StateContext';

interface PlayerCardProps {
  player: Player;
  onToggle: (playerId: string | number) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-lg transition-all ${
        player.isStartingPlayer 
          ? 'bg-green-50 border-2 border-green-200' 
          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`text-lg font-medium ${
          player.isStartingPlayer ? 'text-green-800' : 'text-gray-700'
        }`}>
          {String(player.name)}
        </span>
        {player.isStartingPlayer && (
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            SELECTED
          </span>
        )}
      </div>
      <button
        onClick={() => onToggle(player.id)}
        className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
          player.isStartingPlayer
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {player.isStartingPlayer ? 'Remove' : 'Select'}
      </button>
    </div>
  );
}