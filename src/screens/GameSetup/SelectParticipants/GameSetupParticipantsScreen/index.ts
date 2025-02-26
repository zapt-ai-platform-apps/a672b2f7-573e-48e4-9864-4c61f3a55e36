import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchSquad from '../../features/GameSetup/hooks/useMatchSquad';
import { useStateContext } from '../../hooks/useStateContext';

const GameSetupParticipantsScreen: React.FC = () => {
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleNext = () => {
    const selectedPlayers = matchSquadPlayers.filter(player => player.isInMatchSquad);
    if (selectedPlayers.length === 0) {
      setError('Please select at least one participant.');
    } else {
      setSelectedSquad(selectedPlayers);
      navigate('/next');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {matchSquadPlayers.map(player => (
        <div key={player.id} onClick={() => toggleMatchPlayer(player.id)}>
          {player.name}
        </div>
      ))}
      <button onClick={handleNext}>Continue to Setup →</button>
      <button onClick={handleBack}>← Back</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default GameSetupParticipantsScreen;