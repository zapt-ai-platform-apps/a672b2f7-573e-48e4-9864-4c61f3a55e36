import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameSetupStepOne } from '../../features/GameSetup/GameSetupSteps.jsx';
import GameSetupComponents from '../../features/GameSetup/GameSetupComponents.jsx';
import useMatchSquad from '../../features/GameSetup/hooks/useMatchSquad.js';
import useGameSetup from '../../features/GameSetup/hooks/useGameSetup.js';

function GameSetupScreen() {
  const { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer } = useMatchSquad();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const gameSetup = useGameSetup();

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayers = selectedMatchPlayers.filter(player => player.isStartingPlayer);

  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match.');
    } else {
      setErrorMessage('');
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/squads/options');
    } else {
      setStep(1);
    }
  };

  const handleStartGame = () => {
    if (startingPlayers.length === 0 || !gameSetup.goalkeeper) {
      setErrorMessage('Please select starting players and a goalkeeper.');
      return;
    }
    gameSetup.handleStartGame(startingPlayers, gameSetup.goalkeeper, gameSetup.includeGKPlaytime);
    navigate('/manage');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {step === 1 ? (
        <GameSetupStepOne
          matchSquadPlayers={matchSquadPlayers}
          selectedMatchPlayers={selectedMatchPlayers}
          toggleMatchPlayer={toggleMatchPlayer}
          handleNext={handleNext}
          errorMessage={errorMessage}
        />
      ) : (
        <GameSetupComponents
          {...gameSetup}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          handleStartGame={handleStartGame}
          handleBack={handleBack}
          startingPlayers={startingPlayers}
        />
      )}
    </div>
  );
}

export default GameSetupScreen;