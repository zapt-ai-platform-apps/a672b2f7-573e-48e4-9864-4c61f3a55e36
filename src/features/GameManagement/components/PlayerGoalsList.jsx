import React from 'react';

function PlayerGoalsList({ players, recordGoalForPlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Record Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <div 
            key={player.id}
            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-800 dark:text-gray-200">{player.name}</span>
            <button
              onClick={() => recordGoalForPlayer(player.name)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              Add Goal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerGoalsList;