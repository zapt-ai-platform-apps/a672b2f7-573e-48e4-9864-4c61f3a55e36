import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Starting Lineup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {startingPlayers.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 ${
              player.isStartingPlayer ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <span className="font-medium">{player.name}</span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className={`cursor-pointer px-4 py-2 rounded-full focus:outline-none ${
                player.isStartingPlayer
                  ? 'bg-green-100 text-green-600 font-bold'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {player.isStartingPlayer ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Selected Players:</h3>
        <ul className="list-disc list-inside">
          {startingPlayers
            .filter(player => player.isStartingPlayer)
            .map(player => (
              <li key={player.id} className="text-gray-800">
                {player.name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}