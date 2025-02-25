import { computeTimeElapsed, GameInterval } from './gameTimerLogic';

export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  validIntervals: GameInterval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const currentTime = computeTimeElapsed(validIntervals, isRunning);
  const goal = { team, scorerName, time: currentTime };
  const newGoals = [...goals, goal];
  const newOurScore = team === 'our' ? ourScore + 1 : ourScore;
  const newOpponentScore = team === 'opponent' ? opponentScore + 1 : opponentScore;
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