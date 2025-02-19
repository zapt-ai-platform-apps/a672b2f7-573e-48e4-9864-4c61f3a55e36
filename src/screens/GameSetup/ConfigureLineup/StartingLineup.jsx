import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
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