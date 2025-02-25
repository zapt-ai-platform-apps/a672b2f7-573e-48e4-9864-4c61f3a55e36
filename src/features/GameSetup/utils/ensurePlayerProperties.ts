import type { Player } from '../../../types/GameTypes';

function ensurePlayerProperties(player: Partial<Player> | string): Player {
  if (typeof player === 'string') {
    return {
      id: String(Date.now() + Math.random()),
      name: player,
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 },
      playIntervals: [],
      isStartingPlayer: false,
      isInMatchSquad: false,
      isInStartingLineup: false
    };
  }

  return {
    id: String(player.id || ''),
    name: player.name || '',
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    position: {
      x: typeof player.position?.x === 'number' ? player.position.x : 0,
      y: typeof player.position?.y === 'number' ? player.position.y : 0
    },
    playIntervals: player.playIntervals || [],
    isStartingPlayer: player.isStartingPlayer || false,
    isInMatchSquad: player.isInMatchSquad || false,
    isInStartingLineup: player.isInStartingLineup || false
  };
}

export default ensurePlayerProperties;