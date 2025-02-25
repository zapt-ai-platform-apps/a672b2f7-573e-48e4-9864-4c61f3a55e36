import { Player } from '../../types/GameTypes';

export function getPlayersWithDefaults(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    name: player.name || 'Unknown Player',
    totalPlayTime: player.totalPlayTime ?? 0,
    isOnField: player.isOnField ?? false,
    isGoalkeeper: player.isGoalkeeper ?? false,
    playIntervals: player.playIntervals || [],
    position: player.position || { x: 0, y: 0 }
  }));
}