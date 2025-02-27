import { Goal } from '../../types/GameTypes';

interface RecordGoalResult {
  newGoals: Goal[];
  newOurScore: number;
  newOpponentScore: number;
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  timeElapsed: number,
  goals: Goal[]
): RecordGoalResult {
  const newGoal: Goal = {
    team,
    scorerName,
    time: timeElapsed
  };

  const newGoals = [...goals, newGoal];
  
  // Calculate new scores
  const ourGoals = newGoals.filter(goal => goal.team === 'our').length;
  const opponentGoals = newGoals.filter(goal => goal.team === 'opponent').length;

  return {
    newGoals,
    newOurScore: ourGoals,
    newOpponentScore: opponentGoals
  };
}