import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state';
import useGameSetup from '../../../features/GameSetup/hooks/useGameSetup';
import StartingLineup from '../../../features/GameSetup/StartingLineup';
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
        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <StartingLineup 
          startingPlayers={lineupPlayers}
          toggleStartingPlayer={toggleStartingPlayer}
        />

        <GoalkeeperSettings 
          startingPlayers={lineupPlayers}
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setIncludeGKPlaytime={setIncludeGKPlaytime}
        />

        <div className="flex justify-end">
          <button
            onClick={handleStartGameClick}
            className="px-8 py-4 bg-purple-500 text-white text-xl rounded-full hover:bg-purple-600 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
            disabled={!goalkeeper || lineupPlayers.length === 0}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}