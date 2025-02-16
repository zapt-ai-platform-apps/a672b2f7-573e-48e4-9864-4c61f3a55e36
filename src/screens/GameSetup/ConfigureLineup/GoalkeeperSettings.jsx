import React from 'react';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Goalkeeper Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl">Select Goalkeeper</h3>
          {startingPlayers.map(player => (
            <div key={player.id} className="flex items-center justify-between p-2 border-b">
              <span>{player.name}</span>
              <button
                onClick={() => setGoalkeeper(player)}
                className={`px-4 py-2 rounded transition-colors ${goalkeeper && goalkeeper.id === player.id ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
              >
                {goalkeeper && goalkeeper.id === player.id ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeGKPlaytime}
            onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
            id="includeGkPlaytime"
            className="mr-2"
          />
          <label htmlFor="includeGkPlaytime">Include Goalkeeper Playtime</label>
        </div>
      </div>
    </div>
  );
}