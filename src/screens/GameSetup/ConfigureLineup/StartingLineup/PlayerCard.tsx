import React from 'react';

interface Player {
  id: number;
  name: string;
  selected: boolean;
}

interface PlayerCardProps {
  player: Player;
  onToggle: (id: number) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div onClick={() => onToggle(player.id)} className={`p-4 border rounded cursor-pointer ${player.selected ? 'bg-green-200' : 'bg-white'}`}>
      <h3 className="text-xl font-bold">{player.name}</h3>
      {player.selected && <p className="text-sm text-green-700">Selected</p>}
    </div>
  );
}