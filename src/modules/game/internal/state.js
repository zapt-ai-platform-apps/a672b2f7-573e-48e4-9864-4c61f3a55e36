import { useState, useCallback } from 'react';
import { validateGameIntervals } from '@/modules/game/validators';
import { eventBus } from '@/modules/core/events';
import { events } from '@/modules/game/events';

/**
 * Internal state management for game module
 */
export function useGameState() {
  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals, setGameIntervals] = useState([]);
  const [ourScore, setOurScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [goals, setGoals] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  
  // Update game intervals with validation
  const updateGameIntervals = useCallback((newIntervals) => {
    try {
      // Handle the case where newIntervals is a function
      const intervalsToValidate = typeof newIntervals === 'function' 
        ? newIntervals(gameIntervals)
        : newIntervals;
      
      const validatedIntervals = validateGameIntervals(intervalsToValidate, {
        actionName: 'updateGameIntervals',
        location: 'game/internal/state.js:updateGameIntervals',
        direction: 'internal',
        moduleFrom: 'game',
        moduleTo: 'game'
      });
      
      setGameIntervals(validatedIntervals);
      return validatedIntervals;
    } catch (error) {
      console.error('Game intervals validation error:', error);
      return gameIntervals;
    }
  }, [gameIntervals]);
  
  // Reset the game state
  const resetGame = useCallback(() => {
    setIsRunning(false);
    setGameIntervals([]);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    setGoalkeeper(null);
    setIncludeGKPlaytime(true);
    
    eventBus.publish(events.GAME_RESET, { timestamp: Date.now() });
  }, []);
  
  return {
    // Basic state
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals: updateGameIntervals,
    
    // Score tracking
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    
    // Goalkeeper tracking
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    
    // Actions
    resetGame
  };
}