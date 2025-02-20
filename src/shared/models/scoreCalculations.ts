import { getTimeElapsed } from './timerModel';
import { Goal } from './scoreTypes';

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  currentOurScore: number,
  currentOpponentScore: number,
  goals: Goal[],
  gameIntervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: Goal[] } {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoal: Goal = { team, scorerName: team === 'our' ? scorerName : null, time: timeElapsed, timestamp: Date.now() };
  if (team === 'our') {
    return { newOurScore: currentOurScore + 1, newOpponentScore: currentOpponentScore, newGoals: [...goals, newGoal] };
  } else if (team === 'opponent') {
    return { newOurScore: currentOurScore, newOpponentScore: currentOpponentScore + 1, newGoals: [...goals, newGoal] };
  }
  return { newOurScore: currentOurScore, newOpponentScore: currentOpponentScore, newGoals: goals };
}

export function removeLastGoal(
  currentGoals: Goal[],
  currentOurScore: number,
  currentOpponentScore: number
): { newOurScore: number; newOpponentScore: number; newGoals: Goal[] } {
  if (currentGoals.length === 0) {
    throw new Error('No goals to remove.');
  }
  const lastGoal = currentGoals[currentGoals.length - 1];
  let newOurScore = currentOurScore;
  let newOpponentScore = currentOpponentScore;
  if (lastGoal.team === 'our') {
    newOurScore = Math.max(0, currentOurScore - 1);
  } else if (lastGoal.team === 'opponent') {
    newOpponentScore = Math.max(0, currentOpponentScore - 1);
  }
  return {
    newOurScore,
    newOpponentScore,
    newGoals: currentGoals.slice(0, -1)
  };
}