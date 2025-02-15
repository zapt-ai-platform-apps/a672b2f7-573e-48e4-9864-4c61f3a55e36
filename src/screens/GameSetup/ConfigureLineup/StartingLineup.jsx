import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Starting Lineup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {startingPlayers.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="font-medium dark:text-white">{player.name}</span>
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