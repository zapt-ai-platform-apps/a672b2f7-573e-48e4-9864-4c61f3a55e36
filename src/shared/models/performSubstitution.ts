/**
 * Performs a substitution by replacing one player with another.
 * @param playerData - Array of player objects.
 * @param selectedSubOffPlayer - The player to substitute off the field.
 * @param selectedSubOnPlayer - The player to substitute onto the field.
 * @param isRunning - Indicates if the game is currently running.
 * @returns The updated array of player objects.
 */
export function performSubstitution(
  playerData: any[],
  selectedSubOffPlayer: any,
  selectedSubOnPlayer: any,
  isRunning: boolean
): any[] {
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