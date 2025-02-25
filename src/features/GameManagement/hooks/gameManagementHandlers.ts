import type { GameInterval } from "./gameActionsHelpers";
import { getTotalPlayTime, getTimeElapsed, updatePlayerLists as updateLists, toggleTimer as modelToggleTimer } from './gameManagementLogicHelpers';

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
  gameIntervals: GameInterval[],
  setGameIntervals: (intervals: GameInterval[]) => void
): void {
  console.log("Toggling timer. Current intervals:", gameIntervals);
  setIsRunning((prevIsRunning) => {
    const { newIntervals, newIsRunning } = modelToggleTimer(prevIsRunning, gameIntervals);
    console.log("New timer state:", newIsRunning, "New intervals:", newIntervals);
    setGameIntervals(newIntervals);
    return newIsRunning;
  });
}

export { getTotalPlayTime, getTimeElapsed, updateLists as updatePlayerLists };