import { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { Player } from '../../../types/GameTypes';
import { addPlayerToList, removePlayerFromList, togglePlayerInList } from '../utils/gameSetupActions';
import parsePlayers from '../utils/parsePlayers';

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
  teamName: string;
  opponentName: string;
  matchDate: string;
  gameLocation: string;
  playerText: string;
  players: Player[];
  handleTeamNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpponentNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMatchDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGameLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayerTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleParsePlayerText: () => void;
}

export default function useGameSetup(): UseGameSetupReturn {
  const { selectedSquad, matchSquad, handleStartGame: contextHandleStartGame } = useStateContext();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const initializedRef = useRef<boolean>(false);

  const [teamName, setTeamName] = useState<string>('');
  const [opponentName, setOpponentName] = useState<string>('');
  const [matchDate, setMatchDate] = useState<string>('');
  const [gameLocation, setGameLocation] = useState<string>('');
  const [playerText, setPlayerText] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!initializedRef.current) {
      const playersArr = matchSquad || [];
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
    if (goalkeeper === null) {
      setErrorMessage('Please select a goalkeeper');
      return;
    }
    return contextHandleStartGame(startingPlayers, goalkeeper, includeGKPlaytime);
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleOpponentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(e.target.value);
  };

  const handleMatchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchDate(e.target.value);
  };

  const handleGameLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameLocation(e.target.value);
  };

  const handlePlayerTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayerText(e.target.value);
  };

  const handleParsePlayerText = () => {
    if (playerText.trim()) {
      const parsedPlayers = parsePlayers(playerText);
      setPlayers(parsedPlayers);
    }
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
    handleStartGame,
    teamName,
    opponentName,
    matchDate,
    gameLocation,
    playerText,
    players,
    handleTeamNameChange,
    handleOpponentNameChange,
    handleMatchDateChange,
    handleGameLocationChange,
    handlePlayerTextChange,
    handleParsePlayerText
  };
}