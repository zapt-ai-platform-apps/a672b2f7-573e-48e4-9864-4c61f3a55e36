import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      <ul>
        {players.map(player => (
          <li key={player.id} className="p-2 border-b flex items-center justify-between">
            <span>
              {player.name} {player.isStartingPlayer ? '(Starter)' : '(Bench)'}
            </span>
            <button
              onClick={() => toggleStartingPlayer(player.name)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Toggle Starter
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-lg">Total Starters: {startingPlayersCount}</div>
    </div>
  );
}

function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Goalkeeper Settings</h3>
      <div className="mb-4">
        <label className="block mb-1">Select Goalkeeper:</label>
        <select
          value={goalkeeper ? goalkeeper.id : ''}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedPlayer = startingPlayers.find(p => p.id === selectedId) || null;
            setGoalkeeper(selectedPlayer);
          }}
          className="p-2 border rounded w-full"
        >
          <option value="">Select...</option>
          {startingPlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeGKPlaytime}
            onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
            className="mr-2"
          />
          Include Goalkeeper Playtime
        </label>
      </div>
    </div>
  );
}

export { StartingLineupSelector, GoalkeeperSettings };