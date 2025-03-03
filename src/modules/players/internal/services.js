import { eventBus } from '@/modules/core/events';
import { events } from '@/modules/players/events';

/**
 * Core player management services
 */
export function createPlayerServices(state) {
  // Get players currently on field
  const getOnFieldPlayers = () => {
    return state.getFilteredPlayers(player => player.isOnField)
      .sort((a, b) => getPlayerPlaytime(a) - getPlayerPlaytime(b));
  };
  
  // Get players currently off field
  const getOffFieldPlayers = () => {
    return state.getFilteredPlayers(player => !player.isOnField)
      .sort((a, b) => getPlayerPlaytime(a) - getPlayerPlaytime(b));
  };
  
  // Calculate playtime for a player
  const getPlayerPlaytime = (player, includeGKPlaytime = true, currentTime = Date.now()) => {
    let total = 0;
    player.playIntervals.forEach((interval) => {
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += currentTime - interval.startTime;
      }
    });
    return Math.floor(total / 1000);
  };
  
  // Perform substitution of two players
  const makeSubstitution = (subOffPlayer, subOnPlayer, isRunning) => {
    if (!subOffPlayer || !subOnPlayer) {
      throw new Error('Both substitution players must be specified');
    }
    
    // Update player going off field
    state.updatePlayer(subOffPlayer.name, {
      isOnField: false,
      playIntervals: subOffPlayer.playIntervals.map((interval, idx) => {
        if (idx === subOffPlayer.playIntervals.length - 1 && !interval.endTime) {
          return { ...interval, endTime: Date.now() };
        }
        return interval;
      })
    });
    
    // Update player coming on field
    let updatedIntervals = [...subOnPlayer.playIntervals];
    if (isRunning) {
      updatedIntervals.push({
        startTime: Date.now(),
        endTime: null,
        isGoalkeeper: subOnPlayer.isGoalkeeper
      });
    }
    
    state.updatePlayer(subOnPlayer.name, {
      isOnField: true,
      playIntervals: updatedIntervals
    });
    
    // Publish event
    eventBus.publish(events.SUBSTITUTION_MADE, {
      subOffPlayer: subOffPlayer.name,
      subOnPlayer: subOnPlayer.name,
      timestamp: Date.now()
    });
    
    return true;
  };
  
  // Change the goalkeeper
  const changeGoalkeeper = (newGoalkeeperName, currentGoalkeeperName, isRunning) => {
    if (newGoalkeeperName === currentGoalkeeperName) return false;
    
    const currentGoalkeeper = state.players.find(p => p.name === currentGoalkeeperName);
    const newGoalkeeper = state.players.find(p => p.name === newGoalkeeperName);
    
    if (!currentGoalkeeper || !newGoalkeeper) return false;
    
    // Update current goalkeeper
    if (currentGoalkeeper) {
      let updatedIntervals = [...currentGoalkeeper.playIntervals];
      if (isRunning && currentGoalkeeper.isOnField) {
        if (updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
          updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
        }
        updatedIntervals.push({
          startTime: Date.now(),
          endTime: null,
          isGoalkeeper: false
        });
      }
      
      state.updatePlayer(currentGoalkeeper.name, {
        isGoalkeeper: false,
        playIntervals: updatedIntervals
      });
    }
    
    // Update new goalkeeper
    if (newGoalkeeper) {
      let updatedIntervals = [...newGoalkeeper.playIntervals];
      if (isRunning && newGoalkeeper.isOnField) {
        if (updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
          updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
        }
        updatedIntervals.push({
          startTime: Date.now(),
          endTime: null,
          isGoalkeeper: true
        });
      }
      
      state.updatePlayer(newGoalkeeper.name, {
        isGoalkeeper: true,
        playIntervals: updatedIntervals
      });
    }
    
    eventBus.publish(events.GOALKEEPER_CHANGED, {
      previousGoalkeeper: currentGoalkeeperName,
      newGoalkeeper: newGoalkeeperName,
      timestamp: Date.now()
    });
    
    return true;
  };
  
  // Update player position on the pitch
  const updatePlayerPosition = (playerName, position) => {
    const player = state.players.find(p => p.name === playerName);
    if (!player) return false;
    
    state.updatePlayer(playerName, { position });
    
    eventBus.publish(events.PLAYER_POSITION_CHANGED, {
      playerName,
      position,
      timestamp: Date.now()
    });
    
    return true;
  };
  
  // Initialize players from setup
  const initializePlayers = (setupPlayers, goalkeeper, includeGKPlaytime) => {
    const initializedPlayers = setupPlayers.map((player) => {
      const isStarting = player.isStartingPlayer;
      const isGoalkeeperPlayer = player.name === goalkeeper;
      
      return {
        name: player.name,
        playIntervals: [],
        isOnField: isStarting,
        isGoalkeeper: isGoalkeeperPlayer,
        totalPlayTime: 0,
        position: { x: null, y: null }
      };
    });
    
    state.setPlayers(initializedPlayers);
    return initializedPlayers;
  };
  
  return {
    getOnFieldPlayers,
    getOffFieldPlayers,
    getPlayerPlaytime,
    makeSubstitution,
    changeGoalkeeper,
    updatePlayerPosition,
    initializePlayers
  };
}