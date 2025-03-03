import { useGameState } from '@/modules/game/internal/state';
import { createGameServices } from '@/modules/game/internal/services';
import { validateGameState } from '@/modules/game/validators';

/**
 * Public API for the game module
 */
export function useGame(playerService) {
  const state = useGameState();
  const services = createGameServices(state);
  
  // Validate initial state
  try {
    validateGameState({
      isRunning: state.isRunning,
      gameIntervals: state.gameIntervals,
      ourScore: state.ourScore,
      opponentScore: state.opponentScore,
      includeGKPlaytime: state.includeGKPlaytime,
      goalkeeper: state.goalkeeper
    }, {
      actionName: 'initializeGameModule',
      location: 'game/api.js:useGame',
      direction: 'internal',
      moduleFrom: 'game',
      moduleTo: 'game'
    });
  } catch (error) {
    console.error('Game state validation error:', error);
    // Continue with default state if validation fails
  }
  
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