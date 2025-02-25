import { Player } from '../../types/GameTypes';

export function handlePlayerAdjustment(
  playerData: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      if (isAdding) {
        return { ...player, totalPlayTime: (player.totalPlayTime || 0) + 1 };
      } else {
        return { ...player, totalPlayTime: Math.max((player.totalPlayTime || 0) - 1, 0) };
      }
    }
    return player;
  });
}