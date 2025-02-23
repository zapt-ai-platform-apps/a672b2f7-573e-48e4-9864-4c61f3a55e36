import React from 'react';

type Player = {
  id: number | string;
  name: string;
  selected: boolean;
};

interface PlayerCardProps {
  player: Player;
  onToggle: (id: number | string) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player.id)}
      className={`p-4 border rounded cursor-pointer ${player.selected ? 'bg-green-100' : 'bg-white'}`}
    >
      <h3 className="text-lg font-medium">{player.name}</h3>
    </div>
  );
}