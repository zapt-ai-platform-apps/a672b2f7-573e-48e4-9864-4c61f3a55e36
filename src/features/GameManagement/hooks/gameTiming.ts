interface Interval {
  start: number;
  end?: number;
}

export function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  let total = 0;
  for (const interval of gameIntervals) {
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning) {
      total += Date.now() - interval.start;
    }
  }
  return total;
}

export function toggleTimer(isRunning: boolean, gameIntervals: Interval[]): { newIntervals: Interval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  if (!isRunning) {
    newIntervals.push({ start: Date.now() });
    return { newIntervals, newIsRunning: true };
  } else {
    if (newIntervals.length > 0) {
      const lastInterval = newIntervals[newIntervals.length - 1];
      if (!lastInterval.end) {
        lastInterval.end = Date.now();
      }
    }
    return { newIntervals, newIsRunning: false };
  }
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: Interval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const time = getTimeElapsed(gameIntervals, isRunning);
  const goalEntry = { team, scorerName, time };
  const newGoals = [...goals, goalEntry];
  const newOurScore = team === 'our' ? ourScore + 1 : ourScore;
  const newOpponentScore = team === 'opponent' ? opponentScore + 1 : opponentScore;
  return { newOurScore, newOpponentScore, newGoals };
}