import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer, handleDeletePlayer }) {
  return (
    <ul>
      {players.map((player, index) => (
        <li key={index} className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <input
            type="checkbox"
            checked={player.isStartingPlayer}
            onChange={() => toggleStartingPlayer(player.name)}
            className="mr-4 cursor-pointer w-6 h-6"
            id={`player-${index}`}
          />
          <label 
            htmlFor={`player-${index}`} 
            className="flex-1 text-gray-800 dark:text-gray-200 text-lg cursor-pointer"
          >
            {player.name}
          </label>
          <button
            className="ml-4 text-red-500 hover:text-red-700 cursor-pointer text-2xl"
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