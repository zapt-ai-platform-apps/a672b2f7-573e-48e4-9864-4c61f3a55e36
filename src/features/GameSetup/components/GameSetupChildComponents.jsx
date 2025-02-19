import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      <ul>
        {players.map(player => (
          <li key={player.id} className="mb-2">
            <span className="mr-4">{player?.name || 'Unnamed Player'}</span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {player.isStartingPlayer ? 'Unmark Starter' : 'Mark as Starter'}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-medium">Total Starters: {startingPlayersCount}</p>
    </div>
  );
}

function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  function handleGoalkeeperChange(e) {
    const selectedId = parseInt(e.target.value, 10);
    const selectedPlayer = startingPlayers.find(player => player.id === selectedId);
    setGoalkeeper(selectedPlayer || null);
  }

  function handleGKPlaytimeChange(e) {
    setIncludeGKPlaytime(e.target.checked);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Goalkeeper:</label>
        <select
          value={goalkeeper?.id || ''}
          onChange={handleGoalkeeperChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">-- Select --</option>
          {startingPlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player?.name || 'Unnamed Player'}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="gkPlaytime" 
          checked={includeGKPlaytime} 
          onChange={handleGKPlaytimeChange}
          className="w-4 h-4 accent-blue-500"
        />
        <label htmlFor="gkPlaytime" className="font-medium">Include Goalkeeper Playtime</label>
      </div>
    </div>
  );
}

export { StartingLineupSelector, GoalkeeperSettings };