import { getTimeElapsed } from './gameTimerOperations';

export function recordGoal(team: 'our' | 'opponent', scorerName: string, ourScore: number, opponentScore: number, goals: any, gameIntervals: number[], isRunning: boolean): { newOurScore: number, newOpponentScore: number, newGoals: any } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  const newGoal = { team, scorer: scorerName, time: getTimeElapsed(gameIntervals, isRunning) };
  const newGoals = goals ? [...goals, newGoal] : [newGoal];

  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}