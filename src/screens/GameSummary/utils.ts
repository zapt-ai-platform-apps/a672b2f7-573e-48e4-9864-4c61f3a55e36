import { calculateTotalPlayTime } from '../../shared/models/playerUtils';

export function createGetTotalPlayTime(includeGKPlaytime: boolean) {
  return function(player: any): number {
    return calculateTotalPlayTime(player, includeGKPlaytime, false);
  };
}