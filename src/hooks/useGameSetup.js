import { useState, useEffect } from 'react';
import { useStateContext } from './../state';
import { getInitialPlayers } from './gameSetupInit';

function useGameSetup() {
  const { selectedSquad, setSelectedSquad } = useStateContext();
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
    if (playerName.trim() !== '') {
      const newPlayer = {
        name: playerName.trim(),
        isStartingPlayer: false
      };
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      if (selectedSquad) {
        let updatedSquadPlayers;
        if (Array.isArray(selectedSquad.players)) {
          updatedSquadPlayers = [...selectedSquad.players, newPlayer.name];
        } else {
          updatedSquadPlayers = selectedSquad.players
            ? selectedSquad.players + ', ' + newPlayer.name
            : newPlayer.name;
        }
        setSelectedSquad({ ...selectedSquad, players: updatedSquadPlayers });
      }
      setPlayerName('');
      return true;
    }
    return false;
  };

  const deletePlayer = (playerNameToDelete) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${playerNameToDelete}?`
    );
    if (confirmDelete) {
      const updatedPlayers = players.filter(
        (player) => player.name !== playerNameToDelete
      );
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      if (selectedSquad) {
        let updatedSquadPlayers;
        if (Array.isArray(selectedSquad.players)) {
          updatedSquadPlayers = selectedSquad.players.filter(
            (name) => name !== playerNameToDelete
          );
        } else {
          updatedSquadPlayers = selectedSquad.players
            .split(',')
            .map(p => p.trim())
            .filter(p => p !== playerNameToDelete)
            .join(', ');
        }
        setSelectedSquad({ ...selectedSquad, players: updatedSquadPlayers });
      }
      return true;
    }
    return false;
  };

  const toggleStartingPlayer = (playerNameToToggle) => {
    const updatedPlayers = players.map((player) => {
      if (player.name === playerNameToToggle) {
        return { ...player, isStartingPlayer: !player.isStartingPlayer };
      }
      return player;
    });
    setPlayers(updatedPlayers);
    const count = updatedPlayers.filter((p) => p.isStartingPlayer).length;
    setStartingPlayersCount(count);
    setStartingPlayers(updatedPlayers.filter((p) => p.isStartingPlayer));
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