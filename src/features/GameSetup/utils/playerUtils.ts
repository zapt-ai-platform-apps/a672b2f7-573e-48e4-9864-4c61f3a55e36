import { Player, Position } from '../../../types/GameTypes';

export function ensurePlayerProperties(player: any, index: number): Player {
  const defaultPosition: Position = { x: 0, y: 0 };
  
  if (typeof player === 'string') {
    return {
      id: String(index),
      name: player,
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: defaultPosition
    };
  }
  
  return {
    id: player.id || String(index),
    name: player.name || `Player ${index + 1}`,
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    position: player.position || defaultPosition,
    ...player
  };
}