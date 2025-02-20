import type { Player } from '../../types/GameTypes';

/**
 * Processes the player list by partitioning players into on-field and off-field groups.
 * @param playerData - Array of player objects.
 * @param includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param isRunning - (Unused parameter, kept for compatibility)
 * @returns Object with player arrays.
 */
export function processPlayerLists(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter((player) => player.isOnField);
  const offField = playerData.filter((player) => !player.isOnField);
  return { onField, offField };
}