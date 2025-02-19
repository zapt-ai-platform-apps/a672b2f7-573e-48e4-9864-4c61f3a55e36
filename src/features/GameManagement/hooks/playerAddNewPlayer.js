import { createPlayer } from '../../../shared/models/player';
import { calculateMinPlayTime } from '../../../shared/models/playerUtils';

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
      const minPlayTime = calculateMinPlayTime(props.playerData);
      const newPlayer = {
        ...createPlayer({ name }),
        playIntervals: [],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: minPlayTime
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}