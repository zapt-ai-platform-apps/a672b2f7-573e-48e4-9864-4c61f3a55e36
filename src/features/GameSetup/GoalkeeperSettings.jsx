import React from 'react';

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Goalkeeper:</label>
        <select
          value={goalkeeper && goalkeeper.id ? goalkeeper.id : ""}
          onChange={(e) => {
            const selectedPlayer = startingPlayers.find(player => 
              (player.id ? player.id.toString() : "") === e.target.value
            );
            setGoalkeeper(selectedPlayer);
          }}
          className="w-full border p-2 rounded"
        >
          <option value="" disabled>
            Select goalkeeper
          </option>
          {startingPlayers.map((player, index) => (
            <option key={player.id || index} value={player.id ? player.id : index}>
              {player.name || "Unnamed Player"}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={includeGKPlaytime}
            onChange={() => setIncludeGKPlaytime(!includeGKPlaytime)}
            className="form-checkbox"
          />
          <span className="ml-2">Include Goalkeeper Playtime</span>
        </label>
      </div>
    </div>
  );
}