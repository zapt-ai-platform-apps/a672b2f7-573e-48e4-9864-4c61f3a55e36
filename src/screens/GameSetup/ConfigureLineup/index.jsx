import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state';
import useGameSetup from '../../../features/GameSetup/hooks/useGameSetup';
import StartingLineup from './StartingLineup';
import GoalkeeperSettings from './GoalkeeperSettings';

export default function GameSetupConfiguration() {
  const {
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
    handleStartGame
  } = useGameSetup();

  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();

  const lineupPlayers = startingPlayers;

  const handleBack = () => {
    navigate('/setup/participants');
  };

  const handleStartGameClick = () => {
    const success = handleStartGame();
    if (success) {
      navigate('/game-management');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Selection
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Match Configuration
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errorMessage}
                </div>
              )}
              <StartingLineup 
                startingPlayers={lineupPlayers}
                toggleStartingPlayer={toggleStartingPlayer}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <GoalkeeperSettings 
                startingPlayers={lineupPlayers}
                goalkeeper={goalkeeper}
                setGoalkeeper={setGoalkeeper}
                includeGKPlaytime={includeGKPlaytime}
                setIncludeGKPlaytime={setIncludeGKPlaytime}
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <button
                onClick={handleStartGameClick}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!goalkeeper || lineupPlayers.length === 0}
              >
                Start Match
                <span className="ml-2 inline-block animate-pulse">⚽</span>
              </button>
              {(!goalkeeper || lineupPlayers.length === 0) && (
                <p className="mt-3 text-sm text-gray-500 text-center">
                  {!goalkeeper && 'Select a goalkeeper to continue • '}
                  {lineupPlayers.length === 0 && 'Add players to starting lineup'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}