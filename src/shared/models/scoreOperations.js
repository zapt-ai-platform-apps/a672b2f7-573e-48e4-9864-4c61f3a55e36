import { getTimeElapsed } from './timerModel';

/**
 * @typedef {Object} Goal
 * @property {string} team - The team for which the goal is scored ('our' or 'opponent').
 * @property {string|null} scorerName - Name of the scorer (for 'our' team, null for opponent).
 * @property {number} time - The time when the goal is scored (in seconds).
 * @property {number} timestamp - The timestamp of the goal.
 */

/**
 * Records a goal and updates scores.
 * @param {string} team - The team scoring the goal.
 * @param {string} scorerName - The name of the scorer. Required if team is 'our'.
 * @param {number} currentOurScore - Current score for our team.
 * @param {number} currentOpponentScore - Current score for the opponent.
 * @param {Array<Goal>} goals - Array of previously recorded goals.
 * @param {Array} gameIntervals - Array of game time intervals.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {{newOurScore: number, newOpponentScore: number, newGoals: Array<Goal>}} Updated scores and goals.
 */
export function recordGoal(team, scorerName, currentOurScore, currentOpponentScore, goals, gameIntervals, isRunning) {
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
 * @param {Array<Goal>} currentGoals - Array of current goals.
 * @param {number} currentOurScore - Current score for our team.
 * @param {number} currentOpponentScore - Current score for the opponent.
 * @returns {{newOurScore: number, newOpponentScore: number, newGoals: Array<Goal>}} Updated scores and goal list.
 * @throws {Error} If there are no goals to remove.
 */
export function removeLastGoal(currentGoals, currentOurScore, currentOpponentScore) {
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