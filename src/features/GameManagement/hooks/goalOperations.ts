import { getTimeElapsed } from './intervalOperations';
import { Interval } from '../../../shared/models/timeUtils';

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any,
  gameIntervals: Interval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any } {
  const elapsed = getTimeElapsed(gameIntervals, isRunning);
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  const newGoal = { team, scorerName, time: elapsed };
  const newGoalsResult = Array.isArray(goals) ? [...goals, newGoal] : [newGoal];
  return { newOurScore, newOpponentScore, newGoals: newGoalsResult };
}