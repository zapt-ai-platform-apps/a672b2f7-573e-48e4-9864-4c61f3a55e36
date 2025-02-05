import React from 'react';
import Checkbox from '../../../components/Checkbox.jsx';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Players for This Match</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Select the players who will participate in this match. {startingPlayersCount} {startingPlayersCount === 1 ? "player is" : "players are"} selected.
      </p>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="mb-4">
            <label className="flex items-center cursor-pointer">
              <Checkbox
                checked={player.isStartingPlayer}
                onChange={() => toggleStartingPlayer(player.name)}
              />
              <span className="flex-1 ml-4 text-gray-800 dark:text-gray-200 text-lg">{player.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StartingLineupSelector;