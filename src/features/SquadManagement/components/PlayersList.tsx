import React from "react";

interface PlayersListProps {
  squadPlayersList: string[];
  handleDeletePlayer: (playerName: string) => void;
}

function PlayersList({ squadPlayersList, handleDeletePlayer }: PlayersListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {squadPlayersList.map((player, index) => (
        <div 
          key={index} 
          className="flex items-center bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-gray-800 dark:text-gray-200 transition-colors duration-200"
        >
          <span className="mr-1">{player}</span>
          <button
            type="button"
            onClick={() => handleDeletePlayer(player)}
            className="ml-1 text-gray-500 hover:text-red-600 font-bold leading-none text-lg focus:outline-none transition-colors duration-200 cursor-pointer"
            aria-label={`Remove ${player}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlayersList;