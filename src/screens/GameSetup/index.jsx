import React from 'react';
import GameSetupComponents from '../../features/GameSetup/GameSetupComponents.jsx';
import GameSetupSteps from '../../features/GameSetup/GameSetupSteps.jsx';
import useMatchSquad from '../../features/GameSetup/hooks/useMatchSquad.js';
import { useNavigate } from 'react-router-dom';

function GameSetupScreen() {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const [step, setStep] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState('');
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
      {step === 1 && (
        <>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
          >
            Back
          </button>
          <GameSetupSteps
            matchSquadPlayers={matchSquadPlayers}
            selectedMatchPlayers={selectedMatchPlayers}
            toggleMatchPlayer={toggleMatchPlayer}
            handleNext={handleNext}
            errorMessage={errorMessage}
          />
        </>
      )}
      {step === 2 && (
        <GameSetupComponents
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
}

export default GameSetupScreen;