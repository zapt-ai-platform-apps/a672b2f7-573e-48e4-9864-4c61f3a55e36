import React from 'react';
import { Player } from './useStartingLineup';

interface PlayerCardProps {
  player: Player;
  onToggle: (player: Player) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player)}
      className={`p-4 border rounded-lg shadow-md cursor-pointer transition-colors ${
        player.selected ? 'bg-green-100 border-green-500' : 'bg-white'
      }`}
    >
      <h3 className="text-lg font-semibold">{player.name}</h3>
    </div>
  );
}