import React from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import useMatchSquad from './hooks/useMatchSquad.js';
import { StartingLineupSelector, GoalkeeperSettings } from './components/GameSetupChildComponents.jsx';

function GameSetupComponents({
  playerName,
  setPlayerName,
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  errorMessage,
  setErrorMessage,
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  handleStartGame
}) {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayersFromMatch = selectedMatchPlayers.filter(player => player.isStartingPlayer);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Choose Your Team</h1>
        <p className="mb-4 text-lg">
          Tap to select players for the match and mark them as starters.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Match Squad</h2>
          <ul>
            {matchSquadPlayers.map((player, index) => (
              <li
                key={index}
                onClick={() => toggleMatchPlayer(player.id)}
                className={`p-4 mb-2 border rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
                  player.isInMatch ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'
                }`}
              >
                {player.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Starting Lineup</h2>
          <StartingLineupSelector
            players={selectedMatchPlayers}
            startingPlayersCount={startingPlayersFromMatch.length}
            toggleStartingPlayer={toggleStartingPlayer}
          />
        </div>

        {startingPlayersFromMatch.length > 0 && (
          <div className="mb-8">
            <GoalkeeperSettings
              startingPlayers={startingPlayersFromMatch}
              goalkeeper={goalkeeper}
              setGoalkeeper={setGoalkeeper}
              includeGKPlaytime={includeGKPlaytime}
              setIncludeGKPlaytime={setIncludeGKPlaytime}
            />
          </div>
        )}

        <ErrorMessage errorMessage={errorMessage} />

        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleStartGame(selectedMatchPlayers, goalkeeper, includeGKPlaytime)}
            className={`px-8 py-4 bg-purple-500 text-white text-xl rounded-full cursor-pointer ${
              selectedMatchPlayers.length === 0 || startingPlayersFromMatch.length === 0 || !goalkeeper
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-purple-600'
            } transition-colors duration-300 shadow-lg`}
            disabled={selectedMatchPlayers.length === 0 || startingPlayersFromMatch.length === 0 || !goalkeeper}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSetupComponents;