import { Player } from '../../../types/GameTypes';

export function handlePlayerAdjustment(playerData: Player[], playerId: number | string, isAdding: boolean): Player[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}