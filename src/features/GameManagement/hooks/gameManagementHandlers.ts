import { getTotalPlayTime, getTimeElapsed, updatePlayerLists, toggleTimer as modelToggleTimer } from './gameManagementLogicHelpers';

export function handleEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

export function toggleTimer(
  setIsRunning: (value: boolean | ((prev: boolean) => boolean)) => void,
  gameIntervals: any[],
  setGameIntervals: (intervals: any[]) => void
): void {
  setIsRunning((prevIsRunning) => {
    const { newIntervals, newIsRunning } = modelToggleTimer(prevIsRunning, gameIntervals);
    setGameIntervals(newIntervals);
    return newIsRunning;
  });
}

export { getTotalPlayTime, getTimeElapsed, updatePlayerLists };