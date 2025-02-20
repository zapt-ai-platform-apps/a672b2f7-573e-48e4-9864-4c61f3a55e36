import React, { ChangeEvent } from "react";

interface PlayersManagerProps {
  squadPlayersList: string[];
  newPlayerName: string;
  setNewPlayerName: React.Dispatch<React.SetStateAction<string>>;
  handleAddPlayer: () => void;
  handleDeletePlayer: (index: number) => void;
}

function PlayersManager({
  squadPlayersList,
  newPlayerName,
  setNewPlayerName,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps) {
  return (
    <div className="mb-4">
      <label className="block text-lg mb-2 text-gray-800">Players</label>
      <ul>
        {squadPlayersList.map((player, idx) => (
          <li key={idx} className="flex justify-between items-center mb-2">
            <span className="text-gray-800">{player}</span>
            <button
              type="button"
              onClick={() => handleDeletePlayer(idx)}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newPlayerName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPlayerName(e.target.value)}
        className="w-full p-2 border rounded mt-2 box-border text-gray-800"
        placeholder="Add player..."
      />
      <button
        type="button"
        onClick={handleAddPlayer}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Add Player
      </button>
    </div>
  );
}

export default PlayersManager;