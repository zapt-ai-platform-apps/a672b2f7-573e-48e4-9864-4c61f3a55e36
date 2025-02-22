import React from 'react';

type Player = {
  id: number;
  name: string;
};

type PlayerCardProps = {
  player: Player;
  onToggle: (player: Player) => void;
};

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player)}
      className="p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer transition-all"
    >
      <p className="text-lg font-medium">{player.name}</p>
    </div>
  );
}