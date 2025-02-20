import { getTotalPlayTime, getTimeElapsed, updatePlayerLists, toggleTimer as internalToggleTimer } from './gameManagementLogicHelpers';
import { Dispatch, SetStateAction } from 'react';

interface Interval {
  startTime: number;
  endTime: number | null;
}

export function handleEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(false);
}

export function toggleTimer(
  setIsRunning: Dispatch<SetStateAction<boolean>>,
  gameIntervals: Interval[],
  setGameIntervals: Dispatch<SetStateAction<Interval[]>>
): void {
  setIsRunning(prevIsRunning => {
    const { newIntervals, newIsRunning } = internalToggleTimer(prevIsRunning, gameIntervals);
    setGameIntervals(newIntervals);
    return newIsRunning;
  });
}

export { getTotalPlayTime, getTimeElapsed, updatePlayerLists };