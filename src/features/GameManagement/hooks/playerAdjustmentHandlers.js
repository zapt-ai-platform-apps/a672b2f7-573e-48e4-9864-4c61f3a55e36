/**
 * Creates a handler to initiate increasing a player's play state.
 *
 * @param {Function} setAdjustType - Function to set the adjustment type.
 * @param {Function} setShowAdjustModal - Function to toggle adjustment modal visibility.
 * @returns {Function} A function that sets adjustment type to "increase" and shows the adjust modal.
 */
export function createHandleIncreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

/**
 * Creates a handler to initiate decreasing a player's play state.
 *
 * @param {Function} setAdjustType - Function to set the adjustment type.
 * @param {Function} setShowAdjustModal - Function to toggle adjustment modal visibility.
 * @returns {Function} A function that sets adjustment type to "decrease" and shows the adjust modal.
 */
export function createHandleDecreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
}

/**
 * Creates a handler to confirm player adjustment.
 *
 * @param {Object} params - Parameters object.
 * @param {Object} params.props - Component properties including player data and update functions.
 * @param {string} params.adjustType - The type of adjustment ("increase" or "decrease").
 * @param {Object} params.selectedPlayer - The currently selected player.
 * @param {Function} params.setShowConfirmModal - Function to toggle the confirmation modal.
 * @param {Function} params.setSelectedPlayer - Function to update the selected player.
 * @returns {Function} A function that applies the player adjustment.
 */
export function createConfirmAdjustment({
  props,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}) {
  return () => {
    if (adjustType === "increase" && selectedPlayer) {
      props.setPlayerData(
        props.playerData.map((player) => {
          if (player.name === selectedPlayer.name) {
            if (props.isRunning) {
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
      props.updatePlayerLists();
    } else if (adjustType === "decrease" && selectedPlayer) {
      props.setPlayerData(
        props.playerData.map((player) => {
          if (player.name === selectedPlayer.name) {
            if (
              player.playIntervals.length > 0 &&
              !player.playIntervals[player.playIntervals.length - 1].endTime
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          return player;
        })
      );
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}