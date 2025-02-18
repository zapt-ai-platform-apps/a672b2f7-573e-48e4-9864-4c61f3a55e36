export function handleEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

export function handleRemoveLastGoal(setGoals, setOurScore) {
  setGoals(prevGoals => {
    if (prevGoals.length === 0) return prevGoals;
    const lastGoal = prevGoals[prevGoals.length - 1];
    setOurScore(prev => prev - (lastGoal.team === 'our' ? 1 : 0));
    return prevGoals.slice(0, -1);
  });
}