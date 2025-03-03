import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';

function useGameSetup() {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [startingPlayersCount, setStartingPlayersCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);

  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem('players');
      if (savedPlayers) {
        const loadedPlayers = JSON.parse(savedPlayers);
        if (!Array.isArray(loadedPlayers)) {
          throw new Error('Saved players is not an array');
        }
        
        const updatedPlayers = loadedPlayers.map((player) => ({
          ...player,
          isStartingPlayer: false
        }));
        setPlayers(updatedPlayers);
      }
    } catch (error) {
      console.error('Error loading saved players:', error);
      Sentry.captureException(error, {
        extra: {
          action: 'loadSavedPlayers',
          location: 'modules/game/hooks/useGameSetup.js:useEffect'
        }
      });
      // Continue with empty players array on error
      setPlayers([]);
    }
  }, []);

  const addPlayer = () => {
    if (playerName.trim() !== '') {
      try {
        const newPlayer = {
          name: playerName.trim(),
          isStartingPlayer: false
        };
        
        setPlayers([...players, newPlayer]);
        setPlayerName('');
        return true;
      } catch (error) {
        console.error('Error adding player:', error);
        Sentry.captureException(error, {
          extra: {
            action: 'addPlayer',
            playerName,
            location: 'modules/game/hooks/useGameSetup.js:addPlayer'
          }
        });
        return false;
      }
    }
    return false;
  };

  const deletePlayer = (playerNameToDelete) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete ${playerNameToDelete}?`);
      if (confirmDelete) {
        const updatedPlayers = players.filter((player) => player.name !== playerNameToDelete);
        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
        return true;
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      Sentry.captureException(error, {
        extra: {
          action: 'deletePlayer',
          playerNameToDelete,
          location: 'modules/game/hooks/useGameSetup.js:deletePlayer'
        }
      });
    }
    return false;
  };

  const toggleStartingPlayer = (playerNameToToggle) => {
    try {
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
    } catch (error) {
      console.error('Error toggling starting player:', error);
      Sentry.captureException(error, {
        extra: {
          action: 'toggleStartingPlayer',
          playerNameToToggle,
          location: 'modules/game/hooks/useGameSetup.js:toggleStartingPlayer'
        }
      });
    }
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