import { useState, useCallback } from 'react';
import { validateGameIntervals } from '../validators';
import { eventBus } from '../../core/events';
import { events } from '../events';

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
      const validatedIntervals = validateGameIntervals(newIntervals);
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