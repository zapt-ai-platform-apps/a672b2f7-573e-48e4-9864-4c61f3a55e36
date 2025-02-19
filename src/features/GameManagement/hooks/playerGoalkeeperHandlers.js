import { changeGoalkeeper } from '../../../shared/models/goalkeeperModel.js';

/**
 * Provides UI handlers for goalkeeper assignment.
 *
 * @param {Object} props - Contains playerData, goalkeeper, isRunning, updatePlayerLists, and setter functions.
 * @param {function} setShowGKModal - Sets the visibility of the goalkeeper selection modal.
 * @param {function} setShowGKConfirmModal - Sets the visibility of the goalkeeper confirmation modal.
 * @returns {Object} An object containing functions to assign and confirm goalkeeper changes.
 */
export function createGoalkeeperHandlers(props, setShowGKModal, setShowGKConfirmModal) {
  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const updatedPlayers = changeGoalkeeper(props.playerData, playerName, props.goalkeeper, props.isRunning);
    props.setPlayerData(updatedPlayers);
    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    props.updatePlayerLists();
  };

  const availableGoalkeepers = () => {
    return props.onFieldPlayers.filter(player => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}