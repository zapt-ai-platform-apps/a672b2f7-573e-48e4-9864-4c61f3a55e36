/**
 * Performs a substitution by replacing one player with another.
 * @param {Array} playerData - Array of player objects.
 * @param {Object} selectedSubOffPlayer - The player to substitute off the field.
 * @param {Object} selectedSubOnPlayer - The player to substitute onto the field.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {Array} The updated array of player objects.
 */
export function performSubstitution(playerData, selectedSubOffPlayer, selectedSubOnPlayer, isRunning) {
  return playerData.map(player => {
    if (player.id === selectedSubOffPlayer.id) {
      return {
        ...selectedSubOffPlayer,
        isOnField: false,
        playIntervals:
          isRunning &&
          selectedSubOffPlayer.playIntervals &&
          selectedSubOffPlayer.playIntervals.length > 0 &&
          !selectedSubOffPlayer.playIntervals[selectedSubOffPlayer.playIntervals.length - 1].endTime
            ? [
                ...selectedSubOffPlayer.playIntervals.slice(0, -1),
                {
                  ...selectedSubOffPlayer.playIntervals[selectedSubOffPlayer.playIntervals.length - 1],
                  endTime: Date.now()
                }
              ]
            : selectedSubOffPlayer.playIntervals
      };
    } else if (player.id === selectedSubOnPlayer.id) {
      return {
        ...selectedSubOnPlayer,
        isOnField: true,
        playIntervals: isRunning
          ? [
              ...(selectedSubOnPlayer.playIntervals || []),
              { startTime: Date.now(), endTime: null }
            ]
          : selectedSubOnPlayer.playIntervals
      };
    }
    return player;
  });
}