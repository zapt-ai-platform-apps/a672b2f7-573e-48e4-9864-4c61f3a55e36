export function recordGoal(team, scorerName, currentOurScore, currentOpponentScore, goals, time) {
  const newGoal = {
    team,
    scorerName: team === 'our' ? scorerName : null,
    time,
    timestamp: Date.now()
  };
  if (team === 'our') {
    return {
      newOurScore: currentOurScore + 1,
      newOpponentScore: currentOpponentScore,
      newGoals: [...goals, newGoal]
    };
  } else if (team === 'opponent') {
    return {
      newOurScore: currentOurScore,
      newOpponentScore: currentOpponentScore + 1,
      newGoals: [...goals, newGoal]
    };
  }
  return { newOurScore: currentOurScore, newOpponentScore: currentOpponentScore, newGoals: goals };
}