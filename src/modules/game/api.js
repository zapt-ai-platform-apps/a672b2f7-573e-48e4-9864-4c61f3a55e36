import { useGameState } from './internal/state';
import { createGameServices } from './internal/services';

/**
 * Public API for the game module
 */
export function useGame(playerService) {
  const state = useGameState();
  const services = createGameServices(state);
  
  return {
    // Game status
    isRunning: state.isRunning,
    
    // Score and goals
    ourScore: state.ourScore,
    opponentScore: state.opponentScore,
    goals: state.goals,
    
    // Goalkeeper settings
    goalkeeper: state.goalkeeper,
    includeGKPlaytime: state.includeGKPlaytime,
    
    // Game actions
    toggleTimer: () => services.toggleTimer(playerService),
    endGame: () => services.endGame(playerService),
    getTimeElapsed: services.getTimeElapsed,
    recordGoal: services.recordGoal,
    removeLastGoal: services.removeLastGoal,
    
    // Setup and reset
    initializeGame: services.initializeGame,
    resetGame: state.resetGame
  };
}