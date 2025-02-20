export function handleEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm: (value: boolean) => void): void {
  setShowEndGameConfirm(false);
}

export function handleRemoveLastGoal(
  setGoals: (update: (prevGoals: any[]) => any[]) => void,
  setOurScore: (update: (prev: number) => number) => void
): void {
  setGoals((prevGoals) => {
    if (prevGoals.length === 0) return prevGoals;
    const lastGoal = prevGoals[prevGoals.length - 1];
    setOurScore((prev) => prev - (lastGoal.team === 'our' ? 1 : 0));
    return prevGoals.slice(0, -1);
  });
}