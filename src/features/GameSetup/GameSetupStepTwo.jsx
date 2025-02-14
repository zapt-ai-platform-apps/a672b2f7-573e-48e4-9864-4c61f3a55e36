import React from 'react';
import StartingLineup from "./StartingLineup";
import GoalkeeperSettings from "./GoalkeeperSettings";

export function GameSetupStepTwo({
  playerName,
  setPlayerName,
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  errorMessage,
  startingPlayers = [],
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
        <StartingLineup 
          startingPlayers={startingPlayers}
          toggleStartingPlayer={toggleStartingPlayer}
        />

        <GoalkeeperSettings 
          startingPlayers={startingPlayers}
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setIncludeGKPlaytime={setIncludeGKPlaytime}
        />

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