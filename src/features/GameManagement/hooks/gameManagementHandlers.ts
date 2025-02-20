import { getTotalPlayTime, getTimeElapsed, toggleTimer as modelToggleTimer, updatePlayerLists as modelUpdatePlayerLists } from './gameManagementLogicHelpers';

/**
 * Initiates the process to end the game by showing the confirmation modal.
 * @param setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function handleEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(true);
}

/**
 * Confirms ending the game by hiding the confirmation modal.
 * @param setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function confirmEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

/**
 * Cancels ending the game by hiding the confirmation modal.
 * @param setShowEndGameConfirm - Function to update the end game confirmation state.
 */
export function cancelEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

/**
 * Toggles the game timer state by delegating to the model's toggleTimer function.
 * @param setIsRunning - Function to update the timer running state.
 * @param gameIntervals - Current game intervals.
 * @param setGameIntervals - Function to update the game intervals.
 */
export function toggleTimer(
  setIsRunning: (value: boolean | ((prev: boolean) => boolean)) => boolean,
  gameIntervals: any[],
  setGameIntervals: (intervals: any[]) => void
): void {
  setIsRunning((prevIsRunning: boolean) => {
    const { newIntervals, newIsRunning } = modelToggleTimer(prevIsRunning, gameIntervals);
    setGameIntervals(newIntervals);
    return newIsRunning;
  });
}

export { getTotalPlayTime, getTimeElapsed, modelUpdatePlayerLists as updatePlayerLists };