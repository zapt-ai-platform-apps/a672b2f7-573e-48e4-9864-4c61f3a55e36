interface Goal {
  team: 'our' | 'opponent';
  scorerName: string;
  time: number;
}

export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: Goal[] | undefined,
  validIntervals: any,
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: Goal[] } {
  const newGoal = { team, scorerName, time: Date.now() };
  const newGoals = Array.isArray(goals) ? [...goals, newGoal] : [newGoal];
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustmentLogic(playerData: any[], playerId: string | number, isAdding: boolean): any[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerListsLogic(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): { onField: any[]; offField: any[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}