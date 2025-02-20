import { Player } from '../../../context/StateContext';

export function getTotalPlayTimeHandler(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!includeGKPlaytime && player.isGoalKeeper) {
    return 0;
  }
  return player.playTime || 0;
}

export function getTimeElapsedHandler(gameIntervals: number[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (i + 1 < gameIntervals.length) {
      total += gameIntervals[i + 1] - gameIntervals[i];
    } else if (isRunning) {
      total += now - gameIntervals[i];
    }
  }
  return total;
}

export function toggleTimerHandler(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[], newIsRunning: boolean } {
  const currentTime = Date.now();
  const newIntervals = [...gameIntervals, currentTime];
  return { newIntervals, newIsRunning: !isRunning };
}

export function recordGoalHandler(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: Array<{ team: string; scorerName: string; timestamp: number }>,
  gameIntervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: Array<{ team: string; scorerName: string; timestamp: number }> } {
  const timestamp = Date.now();
  const newGoals = [...goals, { team, scorerName, timestamp }];
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustmentHandler(prev: Player[], playerId: number | string, isAdding: boolean): Player[] {
  return prev.map(player => player.id === playerId ? { ...player, onField: isAdding } : player);
}

export function updatePlayerListsHandler(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.onField);
  const offField = playerData.filter(player => !player.onField);
  return { onField, offField };
}