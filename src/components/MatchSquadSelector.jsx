import React from 'react';

function MatchSquadSelector({ allPlayers, selectedPlayers, togglePlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Players for This Match</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Choose which squad members will be available for this match:
      </p>
      <ul>
        {allPlayers.map((player, index) => (
          <li key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectedPlayers.some(p => p.name === player.name)}
              onChange={() => togglePlayer(player.name)}
              className="mr-4 cursor-pointer w-6 h-6 accent-brand-500"
            />
            <span className="flex-1 text-gray-800 dark:text-gray-200 text-lg">{player.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchSquadSelector;