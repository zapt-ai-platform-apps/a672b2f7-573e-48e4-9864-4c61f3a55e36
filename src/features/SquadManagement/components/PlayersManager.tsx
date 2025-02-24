import React, { ChangeEvent } from "react";

interface PlayersManagerProps {
  squadPlayersList: string[];
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
  handleAddPlayer: () => void;
  handleDeletePlayer: (playerName: string) => void;
}

function PlayersManager({
  squadPlayersList,
  newPlayerName,
  setNewPlayerName,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
        Players
      </label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPlayerName(e.target.value)}
          className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter new player name"
        />
        <button
          type="button"
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
        >
          Add Player
        </button>
      </div>
      <ul>
        {squadPlayersList.map((player, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 py-2 px-3 rounded mb-2">
            <span>{player}</span>
            <button
              type="button"
              onClick={() => handleDeletePlayer(player)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayersManager;