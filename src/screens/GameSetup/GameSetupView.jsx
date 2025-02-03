import React, { useState } from 'react';
import GameSetupStepOne from './GameSetupStepOne';
import GameSetupStepTwo from './GameSetupStepTwo';

function GameSetupView({
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
  handleStartGame,
  matchSquadPlayers,
  toggleMatchPlayer
}) {
  const [step, setStep] = useState(1);
  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);

  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match.');
    } else {
      setErrorMessage('');
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        {step === 1 && (
          <GameSetupStepOne
            matchSquadPlayers={matchSquadPlayers}
            selectedMatchPlayers={selectedMatchPlayers}
            toggleMatchPlayer={toggleMatchPlayer}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <GameSetupStepTwo
            playerName={playerName}
            setPlayerName={setPlayerName}
            selectedMatchPlayers={selectedMatchPlayers}
            addPlayer={addPlayer}
            deletePlayer={deletePlayer}
            toggleStartingPlayer={toggleStartingPlayer}
            startingPlayers={startingPlayers}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
            errorMessage={errorMessage}
            handleBack={handleBack}
            handleStartGame={handleStartGame}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
}

export default GameSetupView;