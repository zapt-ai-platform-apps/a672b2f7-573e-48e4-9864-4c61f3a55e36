import React from 'react';
import useMatchSquad from '../hooks/useMatchSquad';
import NavBar from '../components/navigation/NavBar';
import StartGameButton from './GameSetup/StartGameButton';
import * as Sentry from "@sentry/browser";

export default function GameSetup() {
  const { matchSquadPlayers, activeMatchPlayers, toggleMatchPlayer, toggleStartingPlayer } = useMatchSquad();

  const handleToggleMatchPlayer = (playerName) => {
    try {
      console.log('Toggling match status for player:', playerName);
      toggleMatchPlayer(playerName);
    } catch (error) {
      console.error('Error toggling match player:', error);
      Sentry.captureException(error);
    }
  };

  const handleToggleStartingPlayer = (playerName) => {
    try {
      console.log('Toggling starting player status for:', playerName);
      toggleStartingPlayer(playerName);
    } catch (error) {
      console.error('Error toggling starting player:', error);
      Sentry.captureException(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <NavBar />
      <div className="flex-1 h-full p-4">
        <h1 className="text-3xl font-bold mb-4">Game Setup</h1>
        {matchSquadPlayers.length === 0 ? (
          <div className="text-center text-lg">Loading squad data...</div>
        ) : (
          <div className="space-y-4">
            {matchSquadPlayers.map((player, index) => (
              <div key={index} className="p-4 border rounded flex items-center justify-between">
                <span className="font-medium">{player.name}</span>
                <div className="flex items-center space-x-4">
                  <button
                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleToggleMatchPlayer(player.name)}
                  >
                    {player.isInMatch ? 'Remove' : 'Include'}
                  </button>
                  {player.isInMatch && (
                    <button
                      className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleToggleStartingPlayer(player.name)}
                    >
                      {player.isStartingPlayer ? 'Unmark Starter' : 'Mark Starter'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <StartGameButton disabled={activeMatchPlayers.length === 0} />
        </div>
        <div className="mt-4">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600"
          >
            Made on ZAPT
          </a>
        </div>
      </div>
    </div>
  );
}