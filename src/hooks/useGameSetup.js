import { useState, useEffect } from 'react';
import { useStateContext } from './../state';
import { getInitialPlayers } from './gameSetupInit';
import { addPlayerAction, deletePlayerAction, toggleStartingPlayerAction } from './gameSetupActions';

function useGameSetup() {
  const { selectedSquad } = useStateContext();
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [startingPlayersCount, setStartingPlayersCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);

  useEffect(() => {
    const initialPlayers = getInitialPlayers(selectedSquad);
    if (initialPlayers) {
      setPlayers(initialPlayers);
    }
  }, [selectedSquad]);

  const addPlayer = () => {
    return addPlayerAction(playerName, players, setPlayers, setPlayerName);
  };

  const deletePlayer = (playerNameToDelete) => {
    return deletePlayerAction(playerNameToDelete, players, setPlayers);
  };

  const toggleStartingPlayer = (playerNameToToggle) => {
    toggleStartingPlayerAction(
      playerNameToToggle,
      players,
      setPlayers,
      setStartingPlayersCount,
      setStartingPlayers
    );
  };

  return {
    playerName,
    setPlayerName,
    players,
    setPlayers,
    startingPlayersCount,
    setStartingPlayersCount,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    setStartingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer
  };
}

export default useGameSetup;