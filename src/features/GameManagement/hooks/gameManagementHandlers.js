import { getTotalPlayTime, getTimeElapsed, toggleTimer, updatePlayerLists } from './gameManagementLogicHelpers.js';

/**
 * Initiates the process to end the game by showing the confirmation modal.
 * @param {function} setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function handleEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(true);
}

/**
 * Confirms ending the game by hiding the confirmation modal.
 * @param {function} setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function confirmEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

/**
 * Cancels ending the game by hiding the confirmation modal.
 * @param {function} setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function cancelEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

/**
 * Toggles the game timer state by delegating to the model's toggleTimer function.
 * @param {function} setIsRunning - Function to update the timer running state.
 * @param {Array} gameIntervals - Current game intervals.
 * @param {function} setGameIntervals - Function to update the game intervals.
 */
export function toggleTimer(setIsRunning, gameIntervals, setGameIntervals) {
  setIsRunning(prevIsRunning => {
    const { newIntervals, newIsRunning } = toggleTimer(prevIsRunning, gameIntervals);
    setGameIntervals(newIntervals);
    return newIsRunning;
  });
}

export { getTotalPlayTime, getTimeElapsed, updatePlayerLists };