import React from 'react';

/**
 * StartingLineup component displays the list of starting players with a toggle button to update their starting status.
 * @param {Object} props - Component props.
 * @param {Array} props.startingPlayers - Array of player objects.
 * @param {function} props.toggleStartingPlayer - Function to toggle a player's starting status; expects a player ID.
 */
function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="min-h-screen h-full p-4 text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      {startingPlayers.length ? (
        <ul>
          {startingPlayers.map((player, index) => (
            <li key={player.id} className="flex items-center justify-between my-2 border p-2 rounded">
              <span>{player.name || `Player ${index + 1}`}</span>
              <button 
                onClick={() => toggleStartingPlayer(player.id)}
                className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                  player.isStartingPlayer ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {player.isStartingPlayer ? 'Selected ✓' : 'Not Selected'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No starting players added.</p>
      )}
    </div>
  );
}

export default StartingLineup;