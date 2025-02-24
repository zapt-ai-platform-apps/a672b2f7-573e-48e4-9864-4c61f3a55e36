import React, { ChangeEvent } from "react";

interface PlayerInputProps {
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
  handleAddPlayer: () => void;
}

function PlayerInput({ newPlayerName, setNewPlayerName, handleAddPlayer }: PlayerInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newPlayerName.trim()) {
      e.preventDefault();
      handleAddPlayer();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={newPlayerName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPlayerName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
        placeholder="Enter new player name"
      />
      <button
        type="button"
        onClick={handleAddPlayer}
        disabled={!newPlayerName.trim()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Player
      </button>
    </div>
  );
}

export default PlayerInput;