import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../../state';
import getStartingPlayers from '../helpers/getStartingPlayers.js';
import { addPlayer as addPlayerOp, deletePlayer as deletePlayerOp, toggleStartingPlayer as toggleStartingPlayerOp } from './gameSetupPlayerOperations';
import { handleStartGameWrapper as handleStartGameWrapperOp } from './gameSetupOperations';

/**
 * Custom hook for managing game setup operations.
 * @returns {Object} Object containing state and handlers for game setup.
 */
function useGameSetup() {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const playersArr = getStartingPlayers(selectedSquad, matchSquad);
      if (playersArr.length > 0) {
        setStartingPlayers(playersArr);
        setGoalkeeper(playersArr[0]?.name || '');
      } else {
        setStartingPlayers([]);
      }
      initializedRef.current = true;
    }
  }, [selectedSquad, matchSquad]);

  const addPlayer = () => {
    addPlayerOp(playerName, setStartingPlayers, setPlayerName);
  };

  const deletePlayer = (playerId) => {
    deletePlayerOp(playerId, setStartingPlayers);
  };

  const toggleStartingPlayer = (playerId) => {
    console.log("Toggling starting player with id:", playerId);
    toggleStartingPlayerOp(playerId, setStartingPlayers);
  };

  const handleStartGameWrapper = () => {
    handleStartGameWrapperOp(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame);
  };

  return {
    errorMessage,
    setErrorMessage,
    playerName,
    setPlayerName,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    handleStartGame: handleStartGameWrapper
  };
}

export default useGameSetup;