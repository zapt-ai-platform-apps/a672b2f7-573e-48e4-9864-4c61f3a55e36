import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      <ul className="space-y-2">
        {startingPlayers.map((player, index) => (
          <li key={player.id || index} className="flex items-center justify-between border p-2 rounded">
            <span>{player.name || "Unnamed Player"}</span>
            <button
              onClick={() => toggleStartingPlayer(player)}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Toggle Starter
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}