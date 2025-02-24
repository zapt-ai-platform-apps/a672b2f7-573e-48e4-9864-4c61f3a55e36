import React from 'react';
import type { Player } from './PlayersManager';

interface PlayersListProps {
  players: Player[];
  onRemove: (id: string) => void;
}

export default function PlayersList({ players, onRemove }: PlayersListProps): JSX.Element {
  if (players.length === 0) {
    return <p className="text-white/70 italic">No players added yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {players.map((player) => (
        <li
          key={player.id}
          className="flex justify-between items-center p-3 bg-white/20 rounded-lg text-white"
        >
          <span>{player.name}</span>
          <button
            onClick={() => onRemove(player.id)}
            className="text-red-300 hover:text-red-500 transition-colors cursor-pointer"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}