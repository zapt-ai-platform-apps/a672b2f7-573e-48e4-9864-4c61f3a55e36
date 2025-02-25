export function createGetTotalPlayTime(includeGKPlaytime: boolean) {
  return function(player: { totalPlayTime: number; isGoalkeeper: boolean }): number {
    if (!includeGKPlaytime && player.isGoalkeeper) {
      return 0;
    }
    return player.totalPlayTime;
  };
}