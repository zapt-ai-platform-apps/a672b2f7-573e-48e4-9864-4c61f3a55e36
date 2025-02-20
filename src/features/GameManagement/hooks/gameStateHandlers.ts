import { Dispatch, SetStateAction } from 'react';

export function handleEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm: Dispatch<SetStateAction<boolean>>): void {
  setShowEndGameConfirm(false);
}

export function handleRemoveLastGoal(
  setGoals: Dispatch<SetStateAction<any[]>>,
  setOurScore: Dispatch<SetStateAction<number>>
): void {
  setGoals(prevGoals => {
    if (prevGoals.length === 0) return prevGoals;
    const lastGoal = prevGoals[prevGoals.length - 1];
    setOurScore(prev => prev - (lastGoal.team === 'our' ? 1 : 0));
    return prevGoals.slice(0, -1);
  });
}