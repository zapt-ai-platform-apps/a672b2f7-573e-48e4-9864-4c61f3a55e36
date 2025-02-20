import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../../state';
import { getStartingPlayers } from '../../../shared/models/gameSetupModel';
import { Player, UseGameSetupReturn } from '../types/gameSetupTypes';

export default function useGameSetup(): UseGameSetupReturn {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const playersArr = getStartingPlayers(selectedSquad, matchSquad);
      if (playersArr.length > 0) {
        setStartingPlayers(playersArr);
        const firstStarter = playersArr.find((player: Player) => player.isStartingPlayer);
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
        const player: Player = {
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

  const deletePlayerHandler = (playerId: number | string) => {
    setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  const toggleStartingPlayerHandler = (playerId: number | string) => {
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