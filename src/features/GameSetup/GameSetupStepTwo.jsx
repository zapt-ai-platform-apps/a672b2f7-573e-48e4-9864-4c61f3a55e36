import React from 'react';

export function GameSetupStepTwo({
  playerName,
  setPlayerName,
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  errorMessage,
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  handleBack,
  handleStartGame
}) {
  return (
    <div className="p-8 flex-grow">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          ← Back to Selection
        </button>
        <h1 className="text-4xl font-bold text-green-600">Game Configuration</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Starting Lineup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {startingPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium">{player.name}</span>
                <button
                  onClick={() => toggleStartingPlayer(player.id)}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Goalkeeper Settings</h2>
          <select
            value={goalkeeper}
            onChange={(e) => setGoalkeeper(e.target.value)}
            className="w-full p-3 border rounded-lg cursor-pointer"
          >
            <option value="">Select Goalkeeper</option>
            {startingPlayers.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
          <label className="flex items-center mt-4 space-x-3">
            <input
              type="checkbox"
              checked={includeGKPlaytime}
              onChange={(e) => setIncludeGKPlaytime(e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-700">Include Goalkeeper Playtime in Totals</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-purple-500 text-white text-xl rounded-full hover:bg-purple-600 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
            disabled={!goalkeeper || startingPlayers.length === 0}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}