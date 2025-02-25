import { Player } from '../../types/GameTypes';

export function getPlayersWithDefaults(playerData: Player[]): Player[] {
  return playerData.map((player: Player) => ({
    ...player,
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: typeof player.isOnField === 'boolean' ? player.isOnField : false,
    isGoalkeeper: typeof player.isGoalkeeper === 'boolean' ? player.isGoalkeeper : false,
    status: player.status || 'active',
    minutesPlayed: player.minutesPlayed || Math.floor((player.totalPlayTime || 0) / 60000),
    position:
      typeof player.position === 'object' && player.position !== null
        ? `${player.position.x || 0},${player.position.y || 0}`
        : (player.position || '')
  }));
}