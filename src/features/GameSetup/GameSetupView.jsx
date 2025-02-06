import React, { useState } from 'react';
import { GameSetupStepOne, GameSetupStepTwo } from './GameSetupSteps.jsx';
import useMatchSquad from './hooks/useMatchSquad.js';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    if (step === 1) {
      navigate('/squads/options');
    } else {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        {step === 1 && (
          <>
            <button
              onClick={handleBack}
              className="mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
            >
              Back
            </button>
            <GameSetupStepOne
              matchSquadPlayers={matchSquadPlayers}
              selectedMatchPlayers={selectedMatchPlayers}
              toggleMatchPlayer={toggleMatchPlayer}
              handleNext={handleNext}
            />
          </>
        )}
        {step === 2 && (
          <GameSetupStepTwo
            playerName={playerName}
            setPlayerName={setPlayerName}
            addPlayer={addPlayer}
            deletePlayer={deletePlayer}
            toggleStartingPlayer={toggleStartingPlayer}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            startingPlayers={startingPlayersFromMatch}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
            handleBack={handleBack}
            handleStartGame={handleStartGame}
          />
        )}
      </div>
    </div>
  );
}

export default GameSetupView;