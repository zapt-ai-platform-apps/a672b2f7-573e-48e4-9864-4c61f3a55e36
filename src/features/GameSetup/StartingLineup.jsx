import React from 'react';

function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Starting Lineup</h2>
      {startingPlayers.length ? (
        <ul>
          {startingPlayers.map((player, index) => (
            <li key={index} className="flex items-center justify-between my-2">
              <span>{player.name || `Player ${index + 1}`}</span>
              <button 
                onClick={() => toggleStartingPlayer(player)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Toggle
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No starting players added.</p>
      )}
    </div>
  );
}

export default StartingLineup;