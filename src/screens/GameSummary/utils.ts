import { Player } from '../../types/GameTypes';

export function createGetTotalPlayTime(includeGKPlaytime: boolean): (player: Player) => number {
  return (player: Player) => {
    const basePlayTime = player.playTime || 0;
    const goalKeeperPlayTime = includeGKPlaytime ? (player.gkPlayTime || 0) : 0;
    return basePlayTime + goalKeeperPlayTime;
  };
}