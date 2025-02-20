/**
 * Processes the player list by partitioning players into on-field and off-field groups.
 * @param playerData - Array of player objects.
 * @param includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param isRunning - (Unused parameter, kept for compatibility)
 * @returns Object with player arrays.
 */
export function processPlayerLists(
  playerData: any[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: any[]; offField: any[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}