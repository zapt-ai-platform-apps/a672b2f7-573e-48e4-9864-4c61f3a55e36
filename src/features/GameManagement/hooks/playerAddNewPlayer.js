/**
 * Creates a handler to add a new player.
 *
 * @param {Object} params - Parameters object.
 * @param {Object} params.props - Component properties including player data and update functions.
 * @param {string} params.newPlayerName - The new player's name.
 * @param {Function} params.setNewPlayerName - Function to update the new player's name.
 * @param {Function} params.setShowAddPlayerModal - Function to toggle add player modal visibility.
 * @returns {Function} A function to add a new player.
 */
export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}) {
  return (playerNameOptional) => {
    const name = playerNameOptional ? playerNameOptional : newPlayerName.trim();
    if (name !== "") {
      const minPlayTime =
        props.playerData.length > 0
          ? Math.min(...props.playerData.map((p) => p.totalPlayTime || 0))
          : 0;
      props.setPlayerData([
        ...props.playerData,
        {
          name,
          playIntervals: [],
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime
        }
      ]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}