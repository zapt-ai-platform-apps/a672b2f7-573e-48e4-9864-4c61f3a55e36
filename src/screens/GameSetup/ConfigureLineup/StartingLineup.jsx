import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      {startingPlayers.map(player => (
        <div key={player.id} className="flex items-center justify-between p-2 border-b">
          <span>{player.name}</span>
          <button
            onClick={() => toggleStartingPlayer(player.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}