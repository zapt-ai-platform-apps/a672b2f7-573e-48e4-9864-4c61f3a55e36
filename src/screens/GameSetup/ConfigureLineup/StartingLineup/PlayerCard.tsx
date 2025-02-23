import React from 'react';

type Player = {
  id: number;
  name: string;
  isStartingPlayer?: boolean;
};

type PlayerCardProps = {
  player: Player;
  onToggle: (player: Player) => void;
};

export default function PlayerCard({ player, onToggle }: PlayerCardProps) {
  return (
    <div
      onClick={() => onToggle(player)}
      className={`p-4 border rounded-lg shadow cursor-pointer ${player.isStartingPlayer ? 'bg-green-100' : 'bg-white'}`}
    >
      <p className="text-lg">{player.name}</p>
    </div>
  );
}