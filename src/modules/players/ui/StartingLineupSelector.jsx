import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <ul className="space-y-2 md:space-y-3">
      {players.map((player, index) => (
        <li key={index} className="flex items-center p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <input
            type="checkbox"
            checked={player.isStartingPlayer}
            onChange={() => toggleStartingPlayer(player.name)}
            className="mr-3 cursor-pointer w-5 h-5 md:w-6 md:h-6"
            id={`player-${index}`}
          />
          <label 
            htmlFor={`player-${index}`} 
            className="flex-1 text-gray-800 dark:text-gray-200 text-sm md:text-lg cursor-pointer"
          >
            {player.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default StartingLineupSelector;