import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from './hooks/useMatchSquad.js';
import useGameSetup from './hooks/useGameSetup.js';
import { GameSetupStepOne, GameSetupStepTwo } from './GameSetupSteps.jsx';

function GameSetupView() {
  const {
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
  } = useGameSetup();

  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

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
    if (step === 1) {
      navigate('/squads/options');
    } else {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {step === 1 ? (
        <>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
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
      ) : (
        <GameSetupStepTwo
          playerName={playerName}
          setPlayerName={setPlayerName}
          addPlayer={addPlayer}
          deletePlayer={deletePlayer}
          toggleStartingPlayer={toggleStartingPlayer}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          startingPlayers={startingPlayers}
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setIncludeGKPlaytime={setIncludeGKPlaytime}
          handleBack={handleBack}
          handleStartGame={handleStartGame}
        />
      )}
    </div>
  );
}

export default GameSetupView;