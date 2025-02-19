import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../../state.jsx';
import { getStartingPlayers } from '../../../shared/models/gameSetupModel.js';

function useGameSetup() {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const playersArr = getStartingPlayers(selectedSquad, matchSquad);
      if (playersArr.length > 0) {
        setStartingPlayers(playersArr);
        const firstStarter = playersArr.find(player => player.isStartingPlayer);
        setGoalkeeper(firstStarter || null);
      } else {
        setStartingPlayers([]);
      }
      initializedRef.current = true;
    }
  }, [selectedSquad, matchSquad]);

  const addPlayerHandler = () => {
    if (playerName.trim() !== "") {
      setStartingPlayers(prev => {
        const player = {
          id: Date.now() + Math.random(),
          name: playerName.trim(),
          isStartingPlayer: true,
          isInMatchSquad: true,
          playIntervals: []
        };
        return [...prev, player];
      });
      setPlayerName("");
    }
  };

  const deletePlayerHandler = (playerId) => {
    setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  const toggleStartingPlayerHandler = (playerId) => {
    setStartingPlayers(prev => prev.map(player => {
      if (player.id === playerId) {
        return { ...player, isStartingPlayer: !player.isStartingPlayer };
      }
      return player;
    }));
  };

  const handleStartGame = () => {
    return contextHandleStartGame(startingPlayers, goalkeeper, includeGKPlaytime);
  };

  return {
    errorMessage,
    setErrorMessage,
    playerName,
    setPlayerName,
    addPlayer: addPlayerHandler,
    deletePlayer: deletePlayerHandler,
    toggleStartingPlayer: toggleStartingPlayerHandler,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    handleStartGame
  };
}

export default useGameSetup;