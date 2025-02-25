export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  intervals: any[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const now = Date.now();
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore++;
  } else {
    newOpponentScore++;
  }
  const newGoal = { team, scorerName, timestamp: now };
  const newGoals = [...goals, newGoal];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustmentLogic(players: any[], playerId: string | number, isAdding: boolean): any[] {
  return players.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerListsLogic(players: any[], includeGKPlaytime: boolean, isRunning: boolean): { onField: any[]; offField: any[] } {
  const onField = players.filter(player => player.isOnField);
  const offField = players.filter(player => !player.isOnField);
  return { onField, offField };
}