import React, { ChangeEvent } from "react";

interface Player {
  id: string;
  name: string;
  [key: string]: any;
}

interface PlayersManagerProps {
  squadPlayersList: Player[];
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
  handleAddPlayer: () => void;
  handleDeletePlayer: (playerId: string) => void;
}

const PlayersManager = ({
  squadPlayersList,
  newPlayerName,
  setNewPlayerName,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps): JSX.Element => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
        Players
      </label>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPlayerName(e.target.value)}
          className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter player name"
        />
        <button
          type="button"
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Add Player
        </button>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {squadPlayersList.map((player) => (
          <li key={player.id} className="flex justify-between items-center py-2">
            <span className="text-gray-800 dark:text-gray-200">{player.name}</span>
            <button
              type="button"
              onClick={() => handleDeletePlayer(player.id)}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersManager;