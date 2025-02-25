import { Player } from '../../types/GameTypes';

export function getPlayersWithDefaults(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    isOnField: player.isOnField !== undefined ? player.isOnField : false,
    playTime: player.playTime !== undefined ? player.playTime : 0,
  }));
}