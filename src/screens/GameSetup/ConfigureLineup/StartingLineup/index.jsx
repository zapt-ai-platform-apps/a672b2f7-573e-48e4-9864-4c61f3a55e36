import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Starting XI</h2>
      <div className="grid grid-cols-1 gap-3">
        {startingPlayers.map((player, index) => (
          <div
            key={player.id || index}
            className={`group flex items-center justify-between p-4 rounded-lg transition-all ${
              player.isStartingPlayer 
                ? 'bg-green-50 border-2 border-green-200' 
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-lg font-medium ${
                player.isStartingPlayer ? 'text-green-800' : 'text-gray-700'
              }`}>
                {player.name}
              </span>
              {player.isStartingPlayer && (
                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                  SELECTED
                </span>
              )}
            </div>
            
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                player.isStartingPlayer
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {player.isStartingPlayer ? 'Remove' : 'Select'}
            </button>
          </div>
        ))}
        
        {startingPlayers.length === 0 && (
          <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-100">
            <p className="text-yellow-700">No players in starting lineup</p>
          </div>
        )}
      </div>
    </div>
  );
}