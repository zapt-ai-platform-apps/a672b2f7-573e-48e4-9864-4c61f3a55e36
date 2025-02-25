import { getTimeElapsed } from './gameTimerOperations';

interface GameInterval {
  startTime: number;
  endTime: number | null;
}

export function recordGoal(
  team: 'our' | 'opponent', 
  scorerName: string, 
  ourScore: number, 
  opponentScore: number, 
  goals: any[], 
  gameIntervals: GameInterval[], 
  isRunning: boolean
): { newOurScore: number, newOpponentScore: number, newGoals: any[] } {
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