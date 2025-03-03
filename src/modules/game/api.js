import { useGameState } from '@/modules/game/internal/state';
import { createGameServices } from '@/modules/game/internal/services';

/**
 * Public API for the game module
 */
export function useGame(playerService) {
  const state = useGameState();
  const services = createGameServices(state);
  
  return {
    // Game status
    isRunning: state.isRunning,
    setIsRunning: state.setIsRunning,
    gameIntervals: state.gameIntervals,
    setGameIntervals: state.setGameIntervals,
    
    // Score and goals
    ourScore: state.ourScore,
    setOurScore: state.setOurScore,
    opponentScore: state.opponentScore,
    setOpponentScore: state.setOpponentScore,
    goals: state.goals,
    setGoals: state.setGoals,
    
    // Goalkeeper settings
    goalkeeper: state.goalkeeper,
    setGoalkeeper: state.setGoalkeeper,
    includeGKPlaytime: state.includeGKPlaytime,
    setIncludeGKPlaytime: state.setIncludeGKPlaytime,
    
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