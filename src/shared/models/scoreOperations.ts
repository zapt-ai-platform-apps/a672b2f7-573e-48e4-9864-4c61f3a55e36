import { getTimeElapsed } from './timerModel';

/**
 * Records a goal and updates scores.
 * @param team - The team scoring the goal.
 * @param scorerName - The name of the scorer. Required if team is 'our'.
 * @param currentOurScore - Current score for our team.
 * @param currentOpponentScore - Current score for the opponent.
 * @param goals - Array of previously recorded goals.
 * @param gameIntervals - Array of game time intervals.
 * @param isRunning - Indicates if the game is currently running.
 * @returns Updated scores and goals.
 */
export function recordGoal(
  team: string,
  scorerName: string,
  currentOurScore: number,
  currentOpponentScore: number,
  goals: any[],
  gameIntervals: any[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoal = { team, scorerName: team === 'our' ? scorerName : null, time: timeElapsed, timestamp: Date.now() };
  if (team === 'our') {
    return { newOurScore: currentOurScore + 1, newOpponentScore: currentOpponentScore, newGoals: [...goals, newGoal] };
  } else if (team === 'opponent') {
    return { newOurScore: currentOurScore, newOpponentScore: currentOpponentScore + 1, newGoals: [...goals, newGoal] };
  }
  return { newOurScore: currentOurScore, newOpponentScore: currentOpponentScore, newGoals: goals };
}

/**
 * Removes the last goal from the record.
 * @param currentGoals - Array of current goals.
 * @param currentOurScore - Current score for our team.
 * @param currentOpponentScore - Current score for the opponent.
 * @returns Updated scores and goal list.
 * @throws {Error} If there are no goals to remove.
 */
export function removeLastGoal(
  currentGoals: any[],
  currentOurScore: number,
  currentOpponentScore: number
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
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