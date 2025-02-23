import React from 'react';

interface Player {
  id: number | string;
  name: string;
  selected: boolean;
}

interface PlayerCardProps {
  player: Player;
  onToggle: (playerId: number | string) => void;
}

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${player.selected ? 'bg-green-100' : 'bg-white'}`}
      onClick={() => onToggle(player.id)}
    >
      <h3 className="text-lg font-semibold">{player.name}</h3>
      {player.selected && <span className="text-green-500">Selected</span>}
    </div>
  );
}