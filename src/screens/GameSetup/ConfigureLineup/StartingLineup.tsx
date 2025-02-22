import React from 'react';
import { Player } from '../../../types/GameTypes';

interface StartingLineupProps {
  startingPlayers?: Player[];
  toggleStartingPlayer?: (playerId: number | string) => void;
}

export default function StartingLineup({ startingPlayers = [], toggleStartingPlayer = () => {} }: StartingLineupProps): JSX.Element {
  return (
    <div className="space-y-2">
      {startingPlayers.map((player) => (
        <div
          key={player.id}
          onClick={() => toggleStartingPlayer(player.id)}
          className="p-2 border rounded cursor-pointer select-none"
        >
          {player.name}
        </div>
      ))}
    </div>
  );
}