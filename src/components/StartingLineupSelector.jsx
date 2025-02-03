import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer, handleDeletePlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Players for This Match</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Select the players who will participate in this match. {startingPlayersCount} {startingPlayersCount === 1 ? 'player is' : 'players are'} selected.
      </p>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={player.isStartingPlayer}
              onChange={() => toggleStartingPlayer(player.name)}
              className="mr-4 cursor-pointer w-6 h-6"
            />
            <span className="flex-1 text-gray-800 dark:text-gray-200 text-lg">{player.name}</span>
            <button
              className="ml-4 text-red-500 hover:text-red-700 cursor-pointer text-2xl"
              onClick={() => handleDeletePlayer(player.name)}
            >
              &#128465;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StartingLineupSelector;