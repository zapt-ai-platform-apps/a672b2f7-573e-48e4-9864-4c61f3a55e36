import React from 'react';

function SquadPlayersList({ localPlayers, handleDeleteSquadPlayer }) {
  return (
    <div>
      <label className="block text-lg mb-2">Players List:</label>
      <ul className="space-y-2">
        {localPlayers.map((player, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow transition transform hover:scale-105"
          >
            <span className="text-lg">{player}</span>
            <button
              type="button"
              onClick={() => handleDeleteSquadPlayer(index)}
              className="px-4 py-2 bg-red-500 text-white text-lg rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SquadPlayersList;