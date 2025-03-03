import { eventBus } from '../../core/events';
import { events } from '../events';
import { validateGoalData } from '../../players/validators';

/**
 * Core game management services
 */
export function createGameServices(state) {
  // Toggle the game timer
  const toggleTimer = (playerService) => {
    const wasRunning = state.isRunning;
    
    if (!wasRunning) {
      // Start the timer
      state.setIsRunning(true);
      state.setGameIntervals([...state.gameIntervals, { startTime: Date.now(), endTime: null }]);
      
      // Update on-field player intervals
      const onFieldPlayers = playerService.getOnFieldPlayers();
      onFieldPlayers.forEach(player => {
        playerService.updatePlayer(player.name, {
          playIntervals: [
            ...player.playIntervals,
            { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }
          ]
        });
      });
      
      eventBus.publish(events.GAME_STARTED, { timestamp: Date.now() });
    } else {
      // Pause the timer
      state.setIsRunning(false);
      
      // Update current game interval
      const currentIntervals = [...state.gameIntervals];
      if (currentIntervals.length > 0 && !currentIntervals[currentIntervals.length - 1].endTime) {
        currentIntervals[currentIntervals.length - 1].endTime = Date.now();
        state.setGameIntervals(currentIntervals);
      }
      
      // Update on-field player intervals
      const onFieldPlayers = playerService.getOnFieldPlayers();
      onFieldPlayers.forEach(player => {
        if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
          const updatedIntervals = [...player.playIntervals];
          updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
          
          playerService.updatePlayer(player.name, {
            playIntervals: updatedIntervals
          });
        }
      });
      
      eventBus.publish(events.GAME_PAUSED, { timestamp: Date.now() });
    }
    
    return !wasRunning;
  };
  
  // End the game
  const endGame = (playerService) => {
    if (state.isRunning) {
      // Stop the timer
      state.setIsRunning(false);
      
      // Update current game interval
      const currentIntervals = [...state.gameIntervals];
      if (currentIntervals.length > 0 && !currentIntervals[currentIntervals.length - 1].endTime) {
        currentIntervals[currentIntervals.length - 1].endTime = Date.now();
        state.setGameIntervals(currentIntervals);
      }
      
      // Update on-field player intervals
      const onFieldPlayers = playerService.getOnFieldPlayers();
      onFieldPlayers.forEach(player => {
        if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
          const updatedIntervals = [...player.playIntervals];
          updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
          
          playerService.updatePlayer(player.name, {
            playIntervals: updatedIntervals
          });
        }
      });
    }
    
    eventBus.publish(events.GAME_ENDED, { 
      timestamp: Date.now(),
      ourScore: state.ourScore,
      opponentScore: state.opponentScore,
      goals: state.goals
    });
    
    return true;
  };
  
  // Calculate total game time elapsed
  const getTimeElapsed = () => {
    let total = 0;
    const intervals = Array.isArray(state.gameIntervals) ? state.gameIntervals : [];
    
    intervals.forEach((interval) => {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (state.isRunning) {
        total += Date.now() - interval.startTime;
      }
    });
    
    return Math.floor(total / 1000);
  };
  
  // Record a goal
  const recordGoal = (team, scorerName, time) => {
    if (!time) time = getTimeElapsed();
    
    const goalData = { team, scorerName, time };
    
    try {
      validateGoalData(goalData);
      
      if (team === 'our') {
        state.setOurScore(state.ourScore + 1);
      } else if (team === 'opponent') {
        state.setOpponentScore(state.opponentScore + 1);
      }
      
      state.setGoals([...state.goals, goalData]);
      
      eventBus.publish(events.GOAL_SCORED, goalData);
      
      return true;
    } catch (error) {
      console.error('Invalid goal data:', error);
      return false;
    }
  };
  
  // Remove the most recent goal
  const removeLastGoal = () => {
    if (state.goals.length === 0) return false;
    
    const lastGoal = state.goals[state.goals.length - 1];
    if (lastGoal.team === 'our') {
      state.setOurScore(Math.max(0, state.ourScore - 1));
    } else if (lastGoal.team === 'opponent') {
      state.setOpponentScore(Math.max(0, state.opponentScore - 1));
    }
    
    const updatedGoals = state.goals.slice(0, -1);
    state.setGoals(updatedGoals);
    
    eventBus.publish(events.GOAL_REMOVED, { 
      removedGoal: lastGoal,
      timestamp: Date.now()
    });
    
    return true;
  };
  
  // Initialize the game with setup data
  const initializeGame = (goalkeeper, includeGKPlaytime) => {
    state.setGoalkeeper(goalkeeper);
    state.setIncludeGKPlaytime(includeGKPlaytime);
    return true;
  };
  
  return {
    toggleTimer,
    endGame,
    getTimeElapsed,
    recordGoal,
    removeLastGoal,
    initializeGame
  };
}