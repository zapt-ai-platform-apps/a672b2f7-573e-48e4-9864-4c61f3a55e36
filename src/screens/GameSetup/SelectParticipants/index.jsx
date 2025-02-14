import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from '../../../features/GameSetup/hooks/useMatchSquad.js';
import { GameSetupStepOne } from '../../../features/GameSetup/GameSetupStepOne.jsx';
import { useStateContext } from '../../../state.jsx';

function GameSetupParticipantsScreen() {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const selectedMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);

  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match.');
      return;
    }
    setSelectedSquad(prev => ({
      ...prev,
      players: selectedMatchPlayers.map(p => p.name)
    }));
    navigate('/setup/configuration');
  };

  const handleBack = () => {
    navigate('/squads');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <GameSetupStepOne
        matchSquadPlayers={matchSquadPlayers}
        selectedMatchPlayers={selectedMatchPlayers}
        toggleMatchPlayer={toggleMatchPlayer}
        handleNext={handleNext}
        handleBack={handleBack}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default GameSetupParticipantsScreen;