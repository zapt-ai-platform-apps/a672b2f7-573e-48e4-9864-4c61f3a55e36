import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

function useGameSetup() {
  const location = useLocation();
  const { preSelectedGoalkeeper, includeGKPlaytime: presetIncludeGKPlaytime, fromSquad } = location.state || {};

  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [startingPlayersCount, setStartingPlayersCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [startingPlayers, setStartingPlayers] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(preSelectedGoalkeeper || '');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(
    presetIncludeGKPlaytime !== undefined ? presetIncludeGKPlaytime : true
  );
  const [loadedFromSquad, setLoadedFromSquad] = useState(fromSquad || false);

  useEffect(() => {
    try {
      const savedPlayers = localStorage.getItem('players');
      if (savedPlayers) {
        const loadedPlayers = JSON.parse(savedPlayers);
        if (!Array.isArray(loadedPlayers)) {
          throw new Error('Saved players is not an array');
        }
        
        // Filter out any undefined or null players
        const validPlayers = loadedPlayers.filter(p => p && p.name);
        
        // Count starting players
        const startingCount = validPlayers.filter(p => p.isStartingPlayer).length;
        setStartingPlayersCount(startingCount);
        
        // Set starting players list
        setStartingPlayers(validPlayers.filter(p => p.isStartingPlayer));
        
        // Set players
        setPlayers(validPlayers);
        
        console.log('Loaded players from storage:', validPlayers);
        console.log('Starting player count:', startingCount);
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

  // Update goalkeeper from location state if available
  useEffect(() => {
    if (preSelectedGoalkeeper) {
      setGoalkeeper(preSelectedGoalkeeper);
    }
  }, [preSelectedGoalkeeper]);

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
        
        // Update starting players count
        const startingCount = updatedPlayers.filter(p => p.isStartingPlayer).length;
        setStartingPlayersCount(startingCount);
        
        // Update starting players list
        setStartingPlayers(updatedPlayers.filter(p => p.isStartingPlayer));
        
        // Clear goalkeeper if deleted
        if (goalkeeper === playerNameToDelete) {
          setGoalkeeper('');
        }
        
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
      
      // Save to localStorage
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      
      // Update starting players count
      const count = updatedPlayers.filter((p) => p.isStartingPlayer).length;
      setStartingPlayersCount(count);
      
      // Update starting players list
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
    loadedFromSquad,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer
  };
}

export default useGameSetup;