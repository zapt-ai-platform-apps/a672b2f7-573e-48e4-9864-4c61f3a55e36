import { Player } from '../../types/GameTypes';

export function createGetTotalPlayTime(includeGKPlaytime: boolean): (player: Player) => number {
  return function getTotalPlayTime(player: Player): number {
    let total = (player.playTime as number) || 0;
    if (includeGKPlaytime && player.gkPlayTime) {
      total += player.gkPlayTime;
    }
    return total;
  };
}