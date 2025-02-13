import React from 'react';
import Checkbox from './Checkbox.jsx';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Starting Lineup</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Select starting players ({startingPlayersCount} selected)
      </p>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="mb-4">
            <label className="flex items-center cursor-pointer">
              <Checkbox
                checked={player.isStartingPlayer}
                onChange={() => toggleStartingPlayer(player.id)}
              />
              <span className="flex-1 ml-4 text-gray-800 dark:text-gray-200 text-lg">
                {player.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StartingLineupSelector;