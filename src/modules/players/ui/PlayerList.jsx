import React from 'react';

function PlayerList({ players, title, selectedPlayer, handlePlayerClick, getTotalPlayTime, message }) {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-md h-full mb-4 md:mb-0">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>
      <p className="mb-2 text-gray-600 dark:text-gray-300 text-xs md:text-sm">{message}</p>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
              selectedPlayer && selectedPlayer.name === player.name
                ? 'bg-blue-200 dark:bg-blue-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handlePlayerClick && handlePlayerClick(player)}
          >
            <div className="font-medium text-sm md:text-lg text-gray-800 dark:text-white flex items-center">
              {player.name} 
              {player.isGoalkeeper && (
                <span className="text-yellow-500 font-semibold ml-1 text-xs md:text-sm">(GK)</span>
              )}
            </div>
            <div>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                {formatTime(getTotalPlayTime(player))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;