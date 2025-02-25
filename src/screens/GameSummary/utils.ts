import { Player } from '../../types/GameTypes';

export const createGetTotalPlayTime = (includeGKPlaytime: boolean) => {
  return (player: Player): number => {
    if (!includeGKPlaytime && player.isGoalkeeper) {
      return Math.floor(player.totalPlayTime * 0.9);
    }
    return player.totalPlayTime;
  };
};