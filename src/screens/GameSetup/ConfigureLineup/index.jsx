import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state.jsx';
import GameSetupComponents from '../../../features/GameSetup/GameSetupComponents.jsx';
import useMatchSquad from '../../../features/GameSetup/hooks/useMatchSquad.js';
import useGameSetup from '../../../features/GameSetup/hooks/useGameSetup.js';

function GameSetupConfigurationScreen() {
  const { matchSquadPlayers, toggleStartingPlayer } = useMatchSquad();
  const { selectedSquad } = useStateContext();
  const gameSetup = useGameSetup();
  const navigate = useNavigate();

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayers = selectedMatchPlayers.filter(player => player.isStartingPlayer);

  const handleStartGame = () => {
    if (startingPlayers.length === 0 || !gameSetup.goalkeeper) {
      gameSetup.setErrorMessage('Please select starting players and a goalkeeper.');
      return;
    }
    gameSetup.handleStartGame(startingPlayers, gameSetup.goalkeeper, gameSetup.includeGKPlaytime);
    navigate('/manage');
  };

  const handleBack = () => {
    navigate('/setup/participants');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameSetupComponents
        {...gameSetup}
        errorMessage={gameSetup.errorMessage}
        setErrorMessage={gameSetup.setErrorMessage}
        handleStartGame={handleStartGame}
        handleBack={handleBack}
        startingPlayers={startingPlayers}
        selectedSquad={selectedSquad}
      />
    </div>
  );
}

export default GameSetupConfigurationScreen;