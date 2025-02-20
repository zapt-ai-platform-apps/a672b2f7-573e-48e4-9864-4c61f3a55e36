/**
 * Updates player lists by partitioning players into on-field and off-field based on match squad membership.
 * @param playerData - Array of player objects.
 * @param includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param isRunning - (Unused parameter, kept for compatibility)
 * @returns Object with player arrays.
 */
export function updatePlayerLists(
  playerData: any[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: any[]; offField: any[] } {
  const onField = playerData.filter(player => player.isInMatchSquad);
  const offField = playerData.filter(player => !player.isInMatchSquad);
  return { onField, offField };
}