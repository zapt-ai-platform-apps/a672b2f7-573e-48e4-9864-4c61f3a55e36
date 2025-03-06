import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer, handleDeletePlayer }) {
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
          <button
            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer text-xl md:text-2xl"
            onClick={() => handleDeletePlayer(player.name)}
            aria-label={`Remove ${player.name} from match squad`}
          >
            &#128465;
          </button>
        </li>
      ))}
    </ul>
  );
}

export default StartingLineupSelector;