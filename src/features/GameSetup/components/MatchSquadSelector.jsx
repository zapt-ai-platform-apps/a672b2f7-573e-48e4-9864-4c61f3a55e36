import React from 'react';

function MatchSquadSelector({ allPlayers, selectedPlayers, togglePlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Players for This Match</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-lg">
        Choose which squad members will be available for this match:
      </p>
      <ul>
        {allPlayers.map((player, index) => {
          const isSelected = selectedPlayers.some(p => p === player);
          return (
            <li key={index} className="flex items-center mb-4 select-none">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => togglePlayer(player)}
                  className="hidden"
                />
                <span className={`w-6 h-6 inline-flex items-center justify-center border-2 rounded mr-4 transition-colors ${isSelected ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'}`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-gray-800 dark:text-gray-200 text-lg">{player}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MatchSquadSelector;