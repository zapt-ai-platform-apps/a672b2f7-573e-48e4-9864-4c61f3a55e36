import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      <ul className="space-y-2">
        {startingPlayers.map((player, index) => (
          <li key={player.id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>{player.name}</span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}