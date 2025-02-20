import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../../state';
import { getStartingPlayers } from '../../../shared/models/gameSetupModel';
import { Player } from '../../../types/GameTypes';
import { addPlayerToList, removePlayerFromList, togglePlayerInList } from '../utils/gameSetupActions';

export interface UseGameSetupReturn {
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  addPlayer: () => void;
  deletePlayer: (playerId: number | string) => void;
  toggleStartingPlayer: (playerId: number | string) => void;
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
  handleStartGame: () => void;
}

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
      setStartingPlayers(prev => addPlayerToList(prev, playerName));
      setPlayerName("");
    }
  };

  const deletePlayerHandler = (playerId: number | string) => {
    setStartingPlayers(prev => removePlayerFromList(prev, playerId));
  };

  const toggleStartingPlayerHandler = (playerId: number | string) => {
    setStartingPlayers(prev => togglePlayerInList(prev, playerId));
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