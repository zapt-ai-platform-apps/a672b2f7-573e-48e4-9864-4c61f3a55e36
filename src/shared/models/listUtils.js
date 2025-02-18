/**
 * Processes the player list by partitioning players into on-field and off-field groups.
 * @param {Array} playerData - Array of player objects.
 * @param {boolean} includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param {boolean} isRunning - (Unused parameter, kept for compatibility)
 * @returns {Object} Object with properties "onField" and "offField" containing player arrays.
 */
export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}