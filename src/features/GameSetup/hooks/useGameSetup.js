import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { getInitialPlayers } from './gameSetupInit.js';

function useGameSetup() {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    let playersArr = [];
    if (selectedSquad?.players && selectedSquad.players.length > 0) {
      playersArr = getInitialPlayers(selectedSquad);
    } else if (matchSquad && matchSquad.length > 0) {
      playersArr = matchSquad.map(player => player.name);
    }
    if (playersArr.length > 0) {
      const mappedPlayers = playersArr.map((name, index) => ({
        id: index + 1,
        name,
        isStartingPlayer: true
      }));
      setStartingPlayers(mappedPlayers);
      setGoalkeeper(mappedPlayers[0]?.name || '');
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
      setStartingPlayers([...startingPlayers, newPlayer]);
      setPlayerName('');
    }
  };

  const deletePlayer = (playerId) => {
    setStartingPlayers(startingPlayers.filter(player => player.id !== playerId));
  };

  const toggleStartingPlayer = (playerId) => {
    setStartingPlayers(
      startingPlayers.map(player =>
        player.id === playerId ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
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