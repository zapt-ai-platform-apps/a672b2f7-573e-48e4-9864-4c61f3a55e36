import React, { ChangeEvent } from "react";

interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

interface PlayersManagerProps {
  squadPlayersList: SquadPlayer[];
  newPlayerName: string;
  onNewPlayerNameChange: (name: string) => void;
  handleAddPlayer: () => void;
  handleDeletePlayer: (id: string) => void;
}

function PlayersManager({
  squadPlayersList,
  newPlayerName,
  onNewPlayerNameChange,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps): JSX.Element {
  return (
    <div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
          Add New Player
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onNewPlayerNameChange(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            placeholder="Enter player name"
          />
          <button
            onClick={handleAddPlayer}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        {squadPlayersList.map((player) => (
          <div key={player.id} className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-800 dark:text-white">{player.name}</span>
            <button
              onClick={() => handleDeletePlayer(player.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersManager;