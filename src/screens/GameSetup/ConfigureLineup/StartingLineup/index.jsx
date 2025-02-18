import React from 'react';

/**
 * StartingLineup component displays the list of starting players and allows toggling their selection.
 * @param {Object} props
 * @param {Array} props.startingPlayers - Array of player objects.
 * @param {Function} props.toggleStartingPlayer - Handler to toggle player's starting status.
 * @returns {JSX.Element} The rendered StartingLineup component.
 */
export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      <ul className="space-y-2">
        {startingPlayers.map((player, index) => (
          <li
            key={player.id || index}
            className={`flex items-center justify-between p-2 rounded ${player.isStartingPlayer ? 'bg-green-100' : 'bg-gray-50'}`}
          >
            <span className={`${player.isStartingPlayer ? 'text-green-800 font-bold' : 'text-gray-700'}`}>
              {player.name}
            </span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${player.isStartingPlayer ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              {player.isStartingPlayer ? 'Selected' : 'Select'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}