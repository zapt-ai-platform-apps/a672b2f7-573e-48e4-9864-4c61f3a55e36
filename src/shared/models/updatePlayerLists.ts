/**
 * Updates player lists by partitioning players into on-field and off-field based on match squad membership.
 * @param playerData - Array of player objects.
 * @param includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param isRunning - (Unused parameter, kept for compatibility)
 * @returns Object with player arrays.
 */
import type { Player } from "../../types/GameTypes";

export function updatePlayerLists(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isInMatchSquad);
  const offField = playerData.filter(player => !player.isInMatchSquad);
  return { onField, offField };
}