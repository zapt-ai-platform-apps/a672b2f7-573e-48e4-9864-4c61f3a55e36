import { Player } from '../types/GameTypes';

/**
 * Performs a substitution between two players, updating their play status and time
 * @param players The array of all players
 * @param subOffPlayer The player coming off the field
 * @param subOnPlayer The player going onto the field
 * @param isGameRunning Whether the game timer is currently running
 * @returns Updated array of players after the substitution
 */
export function performSubstitution(
  players: Player[],
  subOffPlayer: Player,
  subOnPlayer: Player,
  isGameRunning: boolean
): Player[] {
  const now = Date.now();
  
  return players.map(player => {
    // Player coming off the field
    if (player.id === subOffPlayer.id) {
      // Update play intervals if available
      if (player.playIntervals) {
        const updatedIntervals = [...player.playIntervals];
        const lastInterval = updatedIntervals[updatedIntervals.length - 1];
        
        // Close the current interval if it's open
        if (lastInterval && !lastInterval.end) {
          lastInterval.end = now;
        }
        
        return {
          ...player,
          isOnField: false,
          playIntervals: updatedIntervals
        };
      }
      
      // Fallback to legacy playTime handling
      let additionalTime = 0;
      if (isGameRunning && player.lastStart) {
        additionalTime = now - player.lastStart;
      }
      
      return {
        ...player,
        isOnField: false,
        playTime: (player.playTime || 0) + additionalTime,
        lastStart: undefined
      };
    }
    
    // Player coming on the field
    if (player.id === subOnPlayer.id) {
      // Update play intervals if available
      if (player.playIntervals || []) {
        const newInterval = {
          start: now,
          end: undefined
        };
        
        return {
          ...player,
          isOnField: true,
          playIntervals: [...(player.playIntervals || []), newInterval]
        };
      }
      
      // Fallback to legacy lastStart handling
      return {
        ...player,
        isOnField: true,
        lastStart: isGameRunning ? now : undefined
      };
    }
    
    return player;
  });
}