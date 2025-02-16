import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import getStartingPlayers from '../helpers/getStartingPlayers.js';

function useGameSetup() {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const playersArr = getStartingPlayers(selectedSquad, matchSquad);
    if (playersArr.length > 0) {
      setStartingPlayers(playersArr);
      setGoalkeeper(playersArr[0]?.name || '');
    } else {
      setStartingPlayers([]);
    }
  }, [selectedSquad, matchSquad]);

  const addPlayer = () => {
    if (playerName.trim() !== '') {
      const newPlayer = {
        id: startingPlayers.length + 1,
        name: playerName.trim(),
        isStartingPlayer: true
      };
      setStartingPlayers(prev => [...prev, newPlayer]);
      setPlayerName('');
    }
  };

  const deletePlayer = (playerId) => {
    setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  const toggleStartingPlayer = (playerId) => {
    console.log("Toggling starting player with id:", playerId);
    setStartingPlayers(prev =>
      prev.map(player =>
        player.id === playerId
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  const handleStartGameWrapper = () => {
    if (!goalkeeper) {
      setErrorMessage('Please select a goalkeeper');
      return;
    }
    const playersToStart = startingPlayers.filter(player => player.isStartingPlayer);
    if (playersToStart.length === 0) {
      setErrorMessage('At least one player must be selected as starter');
      return;
    }
    contextHandleStartGame(playersToStart, goalkeeper, includeGKPlaytime);
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