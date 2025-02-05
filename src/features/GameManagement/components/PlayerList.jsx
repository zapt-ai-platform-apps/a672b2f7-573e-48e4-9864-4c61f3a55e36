import React from 'react';

function PlayerList({ players, title, selectedPlayer, handlePlayerClick, getTotalPlayTime, message }) {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>
      <p className="mb-2 text-gray-600 dark:text-gray-300 text-sm">{message}</p>
      <ul>
        {players.map((player, index) => (
          <li
            key={index}
            className={`flex justify-between items-center mb-2 p-4 rounded-lg cursor-pointer ${
              selectedPlayer && selectedPlayer.name === player.name
                ? 'bg-blue-200 dark:bg-blue-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handlePlayerClick && handlePlayerClick(player)}
          >
            <div className="font-medium text-lg text-gray-800 dark:text-white">
              {player.name} {player.isGoalkeeper && <span className="text-yellow-500 font-semibold">(GK)</span>}
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
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