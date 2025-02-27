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
  
  // Fix: Use team property instead of isOpponentGoal
  if (lastGoal.team === 'opponent') {
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
 * @param team The team that scored ('our' or 'opponent')
 * @param scorerName The name of the scorer
 * @param timeElapsed The time when the goal was scored
 * @param goals Current list of goals
 * @returns Object containing updated scores and goals array
 */
export function addGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  timeElapsed: number,
  goals: Goal[]
) {
  const newGoal: Goal = {
    team,
    scorerName,
    time: timeElapsed
  };
  
  const newGoals = [...goals, newGoal];
  
  return {
    newGoals
  };
}