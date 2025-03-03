import React, { createContext, useContext, useMemo } from 'react';
import { usePlayers } from '@/modules/players/api';
import { useGame } from '@/modules/game/api';
import { eventBus } from '@/modules/core/events';

// Create a unified context for app state
const AppContext = createContext(null);

/**
 * Provider component that makes app state available throughout the component tree
 */
export function AppProvider({ children }) {
  // Initialize player module
  const playerService = usePlayers();
  
  // Initialize game module (dependent on player service)
  const gameService = useGame(playerService);
  
  // Initialize setup functionality
  const handleStartGame = (players, gk, includeGKTime) => {
    // Initialize players
    playerService.initializePlayers(players, gk, includeGKTime);
    
    // Initialize game
    gameService.initializeGame(gk, includeGKTime);
  };
  
  // Create the context value
  const contextValue = useMemo(() => ({
    // Player module
    playerData: playerService.getAllPlayers(),
    getOnFieldPlayers: playerService.getOnFieldPlayers,
    getOffFieldPlayers: playerService.getOffFieldPlayers,
    addPlayer: playerService.addPlayer,
    removePlayer: playerService.removePlayer,
    updatePlayer: playerService.updatePlayer,
    getPlayerPlaytime: playerService.getPlayerPlaytime,
    makeSubstitution: playerService.makeSubstitution,
    changeGoalkeeper: playerService.changeGoalkeeper,
    updatePlayerPosition: playerService.updatePlayerPosition,
    
    // Game module
    isRunning: gameService.isRunning,
    setIsRunning: gameService.setIsRunning,
    gameIntervals: gameService.gameIntervals,
    setGameIntervals: gameService.setGameIntervals,
    ourScore: gameService.ourScore,
    setOurScore: gameService.setOurScore,
    opponentScore: gameService.opponentScore,
    setOpponentScore: gameService.setOpponentScore,
    goals: gameService.goals,
    setGoals: gameService.setGoals,
    goalkeeper: gameService.goalkeeper,
    setGoalkeeper: gameService.setGoalkeeper,
    includeGKPlaytime: gameService.includeGKPlaytime,
    setIncludeGKPlaytime: gameService.setIncludeGKPlaytime,
    toggleTimer: gameService.toggleTimer,
    endGame: gameService.endGame,
    getTimeElapsed: gameService.getTimeElapsed,
    recordGoal: gameService.recordGoal,
    removeLastGoal: gameService.removeLastGoal,
    
    // Setup and reset
    handleStartGame,
    resetGame: gameService.resetGame,
    
    // Event system
    eventBus
  }), [playerService, gameService]);
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom hook for using the app context
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}