/**
 * Handles the substitution process by updating player data.
 *
 * @param {Object} params - Parameters for substitution.
 * @param {Array} params.playerData - Array of player objects.
 * @param {Function} params.setPlayerData - Function to update the player data state.
 * @param {Object} params.selectedSubOffPlayer - Player object to be substituted off.
 * @param {Object} params.selectedSubOnPlayer - Player object to be substituted on.
 * @param {boolean} params.isRunning - Indicates if the game is currently running.
 * @param {Function} params.updatePlayerLists - Function to refresh or update the player lists after substitution.
 * @returns {void}
 */
export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists
}) {
  if (selectedSubOffPlayer && selectedSubOnPlayer) {
    const offPlayerName = selectedSubOffPlayer.name;
    const onPlayerName = selectedSubOnPlayer.name;

    setPlayerData(
      playerData.map((player) => {
        if (player.name === offPlayerName) {
          if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
            player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
          }
          return { ...player, isOnField: false };
        }
        if (player.name === onPlayerName) {
          if (isRunning) {
            return {
              ...player,
              isOnField: true,
              playIntervals: [
                ...player.playIntervals,
                { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }
              ]
            };
          } else {
            return { ...player, isOnField: true };
          }
        }
        return player;
      })
    );
    updatePlayerLists();
  } else {
    alert('Please select a player to sub off and a player to sub on.');
  }
}