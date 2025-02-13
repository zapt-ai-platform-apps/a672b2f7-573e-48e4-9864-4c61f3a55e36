import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { getInitialPlayers } from './gameSetupInit.js';
import { getSquadPlayers, updateSquad } from './updateSquad.js';

function useGameSetup() {
  const { selectedSquad, setSelectedSquad, handleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);

  useEffect(() => {
    if (selectedSquad?.players) {
      const initialPlayers = getInitialPlayers(selectedSquad);
      setGoalkeeper(initialPlayers[0]?.name || '');
    }
  }, [selectedSquad]);

  return {
    errorMessage,
    setErrorMessage,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    handleStartGame: (players, gk, includeGKTime) => {
      if (!gk) {
        setErrorMessage('Please select a goalkeeper');
        return;
      }
      handleStartGame(
        players.filter(p => p.isStartingPlayer),
        gk,
        includeGKTime
      );
    }
  };
}

export default useGameSetup;