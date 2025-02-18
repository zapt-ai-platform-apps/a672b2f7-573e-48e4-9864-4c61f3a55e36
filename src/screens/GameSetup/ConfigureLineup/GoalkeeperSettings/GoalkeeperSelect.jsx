import React from 'react';

export default function GoalkeeperSelect({ startingPlayers, goalkeeper, onChange }) {
  const startingPlayersFiltered = startingPlayers.filter(player => player.isStartingPlayer);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Select Goalkeeper</label>
      <div className="relative">
        <select
          value={goalkeeper ? goalkeeper.id : ''}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="" disabled className="text-gray-400">
            Choose starting goalkeeper
          </option>
          {startingPlayersFiltered.map(player => (
            <option key={player.id} value={player.id} className="text-gray-700">
              {player.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}