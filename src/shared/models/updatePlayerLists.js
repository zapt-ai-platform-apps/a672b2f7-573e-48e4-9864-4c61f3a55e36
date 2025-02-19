/**
 * Updates player lists by partitioning players into on-field and off-field based on match squad membership.
 * @param {Array} playerData - Array of player objects.
 * @param {boolean} includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param {boolean} isRunning - (Unused parameter, kept for compatibility)
 * @returns {{onField: Array, offField: Array}} Object with player arrays.
 */
export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => player.isInMatchSquad);
  const offField = playerData.filter(player => !player.isInMatchSquad);
  return { onField, offField };
}