import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGameTimer from './useGameTimer';
import { useStateContext } from '../../../hooks/useStateContext';
import { timeFormatter } from '../../../screens/GameManagement/utils/timeFormatter';
import { updatePlayerLists } from './gameActionsHelpers';
import { useSubstitutionLogic } from './substitutionLogic';
import { 
  handleAssignGoalkeeper, 
  handleRemoveLastGoal, 
  handleIncreasePlayers, 
  handleDecreasePlayers,
  getGoalkeeper
} from './gameManagementHandlers';
import type { Player, Goal } from '../../../types/GameTypes';
import * as Sentry from '@sentry/browser';

export function useGameManagementLogic() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    playerData, 
    setPlayerData, 
    goalkeeper, 
    includeGKPlaytime, 
    resetGame, 
    handleStartGame 
  } = useStateContext();
  
  // State for managing game flow
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [showAssignGkModal, setShowAssignGkModal] = useState<boolean>(false);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  
  // Computed properties from player data
  const { onField: onFieldPlayers, offField: offFieldPlayers } = 
    updatePlayerLists(playerData, includeGKPlaytime, isRunning);
  
  // Custom hooks for specific functionality
  const { 
    timeElapsed,
    startTimer,
    stopTimer,
    resetTimer,
    gameIntervals,
    getTimeElapsed
  } = useGameTimer();
  
  // Format the time elapsed to return a string
  const getFormattedTimeElapsed = useCallback(() => {
    return timeFormatter(getTimeElapsed());
  }, [getTimeElapsed]);
  
  const {
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
    confirmSubstitution,
    cancelSubstitution
  } = useSubstitutionLogic({
    playerData,
    setPlayerData,
    isRunning
  });

  // Update game state with new players
  const updateGameState = useCallback((players: Player[], gk: Player | null, includeGkTime: boolean) => {
    handleStartGame(players, gk!, includeGkTime);
  }, [handleStartGame]);

  // Initialize the game if we have data from previous screen
  useEffect(() => {
    if (location.state?.players && !gameInProgress) {
      const initialPlayers = location.state.players;
      const initialGoalkeeper = location.state.goalkeeper;
      const includeGkTime = location.state.includeGKPlaytime ?? true;
      
      updateGameState(initialPlayers, initialGoalkeeper, includeGkTime);
      setGameInProgress(true);
    } else if (!gameInProgress && !location.state?.players) {
      // If no game in progress and no data, redirect to game setup
      navigate('/game-setup');
    }
  }, [location, gameInProgress, navigate, updateGameState]);

  // Timer functions
  const toggleTimer = useCallback(() => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
    setIsRunning(prev => !prev);
  }, [isRunning, startTimer, stopTimer]);

  // Goals tracking
  const recordGoal = useCallback((team: 'our' | 'opponent', scorerName: string) => {
    try {
      // Add goal and update scores
      const newGoals = [...goals, {
        team,
        scorerName,
        time: timeElapsed
      }];
      
      setGoals(newGoals);
      
      if (team === 'our') {
        setOurScore(prev => prev + 1);
      } else {
        setOpponentScore(prev => prev + 1);
      }
      
      setShowGoalModal(false);
    } catch (error) {
      console.error('Error recording goal:', error);
      Sentry.captureException(error);
    }
  }, [goals, timeElapsed]);

  // End game handling
  const handleEndGame = useCallback(() => {
    setShowEndGameConfirm(true);
  }, []);

  const confirmEndGame = useCallback(() => {
    stopTimer();
    setIsRunning(false);
    setShowEndGameConfirm(false);
    
    // Navigate to summary with all the data
    navigate('/game-summary', {
      state: {
        playerData,
        gameIntervals,
        finalTime: timeElapsed,
        ourScore,
        opponentScore,
        goals
      }
    });
  }, [navigate, playerData, gameIntervals, timeElapsed, ourScore, opponentScore, goals, stopTimer]);

  const cancelEndGame = useCallback(() => {
    setShowEndGameConfirm(false);
  }, []);

  // Get total play time for a player
  const getTotalPlayTime = useCallback((player: Player): number => {
    if (!player) return 0;
    
    // Base playtime
    let playtime = player.totalPlayTime || 0;
    
    // Add current session time if player is on field and timer is running
    if (player.isOnField && isRunning) {
      playtime += timeElapsed;
    }
    
    return playtime;
  }, [isRunning, timeElapsed]);

  // Game action handlers
  const assignGoalkeeper = useCallback(() => {
    setShowAssignGkModal(true);
  }, []);

  const handleAssignGkConfirm = useCallback((playerId: string) => {
    handleAssignGoalkeeper(playerData, playerId, setPlayerData);
  }, [playerData, setPlayerData]);

  const removeLastGoal = useCallback(() => {
    handleRemoveLastGoal(goals, setGoals, ourScore, opponentScore, setOurScore, setOpponentScore);
  }, [goals, ourScore, opponentScore]);

  const increasePlayers = useCallback(() => {
    handleIncreasePlayers(playerData, setPlayerData);
  }, [playerData, setPlayerData]);

  const decreasePlayers = useCallback(() => {
    handleDecreasePlayers(playerData, setPlayerData);
  }, [playerData, setPlayerData]);

  // Get the current goalkeeper
  const currentGoalkeeper = getGoalkeeper(playerData);

  return {
    playerData,
    isRunning,
    ourScore,
    opponentScore,
    getTimeElapsed: getFormattedTimeElapsed,
    toggleTimer,
    handleEndGame,
    showEndGameConfirm,
    confirmEndGame,
    cancelEndGame,
    recordGoal,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
    confirmSubstitution,
    cancelSubstitution,
    showGoalModal,
    setShowGoalModal,
    showAddPlayerModal,
    setShowAddPlayerModal,
    assignGoalkeeper,
    handleRemoveLastGoal: removeLastGoal,
    handleIncreasePlayers: increasePlayers,
    handleDecreasePlayers: decreasePlayers,
    showAssignGkModal,
    setShowAssignGkModal,
    handleAssignGkConfirm,
    currentGoalkeeper
  };
}