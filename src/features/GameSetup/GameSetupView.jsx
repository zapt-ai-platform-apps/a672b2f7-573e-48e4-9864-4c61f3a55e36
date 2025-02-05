import React, { useState } from 'react';
import GameSetupStepOne from './GameSetupStepOne.jsx';
import GameSetupStepTwo from './GameSetupStepTwo.jsx';
import useMatchSquad from './hooks/useMatchSquad.js';

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
  handleStartGame
}) {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const [step, setStep] = useState(1);

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);
  const startingPlayersFromMatch = selectedMatchPlayers.filter(player => player.isStartingPlayer);

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
            startingPlayers={startingPlayersFromMatch}
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