import React from 'react';

export function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Starting Lineup</h2>
      <ul>
        {players.map(player => (
          <li key={player.id} className="mb-2">
            <button
              onClick={() => toggleStartingPlayer(player.id)}
              className={`px-4 py-2 border rounded ${player.isStartingPlayer ? 'bg-green-200' : 'bg-gray-200'}`}
            >
              {player.name} {player.isStartingPlayer ? '(Starter)' : ''}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2">Total Starters Selected: {startingPlayersCount}</p>
    </div>
  );
}

export function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="mr-2">Select Goalkeeper:</label>
        <select
          value={goalkeeper || ''}
          onChange={(e) => setGoalkeeper(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="" disabled>
            Choose a player
          </option>
          {startingPlayers.map(player => (
            <option key={player.id} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-2">Include Goalkeeper Playtime:</label>
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
        />
      </div>
    </div>
  );
}