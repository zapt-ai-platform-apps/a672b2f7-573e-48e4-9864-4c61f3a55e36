import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Starting Lineup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {startingPlayers.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <span className="font-medium">{player.name}</span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}