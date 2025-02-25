import type { Goal } from "../types/GameTypes";

/**
 * Removes the last goal from the goals array and updates scores accordingly
 * @param goals The current list of goals
 * @param ourScore Current team score
 * @param opponentScore Current opponent score
 * @returns Object containing updated scores and goals array
 */
export function removeLastGoal(
  goals: Goal[],
  ourScore: number,
  opponentScore: number
) {
  if (goals.length === 0) {
    throw new Error("No goals to remove");
  }
  
  const lastGoal = goals[goals.length - 1];
  const newGoals = [...goals.slice(0, -1)];
  
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  
  if (lastGoal.isOpponentGoal) {
    newOpponentScore = Math.max(0, opponentScore - 1);
  } else {
    newOurScore = Math.max(0, ourScore - 1);
  }
  
  return {
    newOurScore,
    newOpponentScore,
    newGoals
  };
}

/**
 * Adds a new goal to the goals array and updates scores
 * @param goals Current list of goals
 * @param newGoal Goal to add
 * @param ourScore Current team score
 * @param opponentScore Current opponent score
 * @returns Object containing updated scores and goals array
 */
export function addGoal(
  goals: Goal[],
  newGoal: Goal,
  ourScore: number,
  opponentScore: number
) {
  const newGoals = [...goals, newGoal];
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  
  if (newGoal.isOpponentGoal) {
    newOpponentScore += 1;
  } else {
    newOurScore += 1;
  }
  
  return {
    newOurScore,
    newOpponentScore,
    newGoals
  };
}