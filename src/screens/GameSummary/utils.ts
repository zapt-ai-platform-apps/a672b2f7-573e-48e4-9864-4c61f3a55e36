import { Player } from '../../types/GameTypes';

export function createGetTotalPlayTime(includeGKPlaytime: boolean): (player: Player) => number {
  return (player: Player) => {
    const basePlayTime = player.playTime || 0;
    return basePlayTime;
  };
}