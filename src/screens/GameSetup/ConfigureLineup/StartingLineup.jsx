import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Starting Lineup</h2>
      {startingPlayers && startingPlayers.length > 0 ? (
        <ul className="space-y-2">
          {startingPlayers.map((player, index) => (
            <li
              key={index}
              onClick={() => toggleStartingPlayer(player)}
              className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {player}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No players in the lineup.</p>
      )}
    </div>
  );
}