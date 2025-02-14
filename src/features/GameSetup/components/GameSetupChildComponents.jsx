import React from 'react';

function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Starting Lineup</h2>
      <ul>
        {players.map(player => (
          <li key={player.id} className="mb-2">
            <span className="mr-4">{player.name}</span>
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {player.isStartingPlayer ? 'Unmark Starter' : 'Mark as Starter'}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4">Total Starters: {startingPlayersCount}</p>
    </div>
  );
}

function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  function handleGoalkeeperChange(e) {
    const selectedId = parseInt(e.target.value, 10);
    const selectedPlayer = startingPlayers.find(player => player.id === selectedId);
    setGoalkeeper(selectedPlayer);
  }

  function handleGKPlaytimeChange(e) {
    setIncludeGKPlaytime(e.target.checked);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="mr-4">Select Goalkeeper:</label>
        <select
          value={goalkeeper ? goalkeeper.id : ''}
          onChange={handleGoalkeeperChange}
          className="px-4 py-2 border rounded"
        >
          <option value="">-- Select --</option>
          {startingPlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-4">Include Goalkeeper Playtime:</label>
        <input type="checkbox" checked={includeGKPlaytime} onChange={handleGKPlaytimeChange} />
      </div>
    </div>
  );
}

export { StartingLineupSelector, GoalkeeperSettings };