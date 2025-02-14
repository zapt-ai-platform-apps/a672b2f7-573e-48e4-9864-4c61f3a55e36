import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state.jsx';
import useMatchSquad from '../../../features/GameSetup/hooks/useMatchSquad.js';
import useGameSetup from '../../../features/GameSetup/hooks/useGameSetup.js';
import ErrorMessage from '../../../components/ErrorMessage.jsx';
import StartingLineupSelector from '../../../features/GameSetup/components/StartingLineupSelector.jsx';
import GoalkeeperSettings from '../../../features/GameSetup/components/GoalkeeperSettings.jsx';

function GameSetupConfigurationScreen() {
  const { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer } = useMatchSquad();
  const { selectedSquad } = useStateContext();
  const gameSetup = useGameSetup();
  const navigate = useNavigate();

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayers = selectedMatchPlayers.filter(player => player.isStartingPlayer);

  const handleStartGame = () => {
    if (selectedMatchPlayers.length === 0 || !gameSetup.goalkeeper) {
      gameSetup.setErrorMessage('Please select match participants and a goalkeeper.');
      return;
    }
    gameSetup.handleStartGame(selectedMatchPlayers, gameSetup.goalkeeper, gameSetup.includeGKPlaytime);
    navigate('/manage');
  };

  const handleBack = () => {
    navigate('/setup/participants');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Choose Your Team</h1>
        <p className="mb-4 text-lg">
          Tap to select players for the match and mark them as starters.
        </p>
        <div className="mb-8">
          <StartingLineupSelector
            players={selectedMatchPlayers}
            startingPlayersCount={startingPlayers.length}
            toggleStartingPlayer={toggleStartingPlayer}
          />
        </div>
        {startingPlayers.length > 0 && (
          <div className="mb-8">
            <GoalkeeperSettings
              startingPlayers={startingPlayers}
              goalkeeper={gameSetup.goalkeeper}
              setGoalkeeper={gameSetup.setGoalkeeper}
              includeGKPlaytime={gameSetup.includeGKPlaytime}
              setIncludeGKPlaytime={gameSetup.setIncludeGKPlaytime}
            />
          </div>
        )}
        <ErrorMessage errorMessage={gameSetup.errorMessage} />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleStartGame}
            className={`px-8 py-4 bg-purple-500 text-white text-xl rounded-full cursor-pointer ${
              selectedMatchPlayers.length === 0 || startingPlayers.length === 0 || !gameSetup.goalkeeper
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-purple-600'
            } transition-colors duration-300 shadow-lg`}
            disabled={selectedMatchPlayers.length === 0 || startingPlayers.length === 0 || !gameSetup.goalkeeper}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSetupConfigurationScreen;