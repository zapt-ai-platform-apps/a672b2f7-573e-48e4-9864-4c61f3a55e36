import React from 'react';

export function StartingLineupSelector({ players, startingPlayersCount, toggleStartingPlayer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Starting Lineup</h2>
      <ul>
        {players.map((player) => (
          <li
            key={player.id}
            onClick={() => toggleStartingPlayer(player.id)}
            className={`p-4 mb-2 border rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
              player.isStartingPlayer ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
            }`}
          >
            {player.name} {player.isStartingPlayer ? '(Starter)' : ''}
          </li>
        ))}
      </ul>
      <p>Selected {startingPlayersCount} starter(s).</p>
    </div>
  );
}

export function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  const handleGoalkeeperChange = (e) => {
    const selectedId = e.target.value;
    const selectedPlayer = startingPlayers.find((player) => player.id === selectedId);
    setGoalkeeper(selectedPlayer);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Goalkeeper:</label>
        <select
          value={goalkeeper ? goalkeeper.id : ''}
          onChange={handleGoalkeeperChange}
          className="p-2 border rounded"
        >
          <option value="">Select a goalkeeper</option>
          {startingPlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mr-2">Include Goalkeeper Playtime</label>
        <input
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
        />
      </div>
    </div>
  );
}