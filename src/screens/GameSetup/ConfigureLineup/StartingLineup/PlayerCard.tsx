import React from 'react';
import type { Player } from '../../../context/StateContext';

interface PlayerCardProps {
  player: Player;
  onToggle: (playerId: string | number) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player.id)}
      className={`cursor-pointer p-4 rounded shadow border transition-colors ${
        player.isStartingPlayer ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'
      }`}
    >
      <div className="font-semibold text-lg">
        {player.name || `Player ${player.id}`}
      </div>
    </div>
  );
}