import React from 'react';

type Player = {
  id: string | number;
  isStartingPlayer?: boolean;
  name?: string;
};

type PlayerCardProps = {
  player: Player;
  onToggle: (playerId: string | number) => void;
};

export default function PlayerCard({ player, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div
      onClick={() => onToggle(player.id)}
      className={`p-4 border rounded cursor-pointer ${player.isStartingPlayer ? 'bg-green-100' : 'bg-white'}`}
    >
      <h2 className="text-lg font-medium">{player.name || 'Unnamed Player'}</h2>
    </div>
  );
}