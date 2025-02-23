import React from 'react';

interface Player {
  id: number | string;
  name: string;
  selected?: boolean;
}

interface PlayerCardProps {
  player: Player;
  onToggle: (id: number | string) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player.id)}
      className={`cursor-pointer px-4 py-2 border rounded-lg shadow-sm ${player.selected ? 'bg-green-100' : 'bg-white'}`}
    >
      {player.name}
    </div>
  );
}