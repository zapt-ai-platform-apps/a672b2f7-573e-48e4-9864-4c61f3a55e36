import { Player } from '../../types/GameTypes';

export function getPlayerLists(
  players: Player[],
  includeGKPlaytime: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(p => p.isOnField);
  const offField = players.filter(p => !p.isOnField);
  
  return { onField, offField };
}

export function handlePlayerAdjustment(
  players: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return players.map(player => {
    if (String(player.id) === String(playerId)) {
      const newPlayerStatus = {
        ...player,
        isOnField: isAdding,
      };
      
      if (player.playIntervals) {
        const intervals = [...player.playIntervals];
        
        if (isAdding) {
          intervals.push({
            start: Date.now(),
            end: null,
            isGoalkeeper: player.isGoalkeeper || false
          });
        } else if (intervals.length > 0) {
          const lastIndex = intervals.length - 1;
          if (!intervals[lastIndex].end) {
            intervals[lastIndex] = {
              ...intervals[lastIndex],
              end: Date.now()
            };
          }
        }
        
        newPlayerStatus.playIntervals = intervals;
      }
      
      return newPlayerStatus;
    }
    return player;
  });
}

export function performSubstitution(
  players: Player[],
  onFieldPlayerId: string | number,
  offFieldPlayerId: string | number
): Player[] {
  return players.map(player => {
    const playerId = String(player.id);
    const onFieldId = String(onFieldPlayerId);
    const offFieldId = String(offFieldPlayerId);
    
    if (playerId === onFieldId) {
      const intervals = [...(player.playIntervals || [])];
      if (intervals.length > 0) {
        const lastIndex = intervals.length - 1;
        if (!intervals[lastIndex].end) {
          intervals[lastIndex] = {
            ...intervals[lastIndex],
            end: Date.now()
          };
        }
      }
      
      return {
        ...player,
        isOnField: false,
        playIntervals: intervals
      };
    }
    
    if (playerId === offFieldId) {
      const intervals = [...(player.playIntervals || [])];
      intervals.push({
        start: Date.now(),
        end: null,
        isGoalkeeper: player.isGoalkeeper || false
      });
      
      return {
        ...player,
        isOnField: true,
        playIntervals: intervals
      };
    }
    
    return player;
  });
}