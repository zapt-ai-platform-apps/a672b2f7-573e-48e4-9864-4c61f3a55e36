export function finalizeIntervals(intervals: any[]): any[] {
  return intervals.map(interval => ({
    ...interval,
    start: interval.start || interval.startTime || Date.now()
  }));
}

export function addInterval(existingIntervals: any[], player: any, isRunning: boolean): any[] {
  if (isRunning && player.isOnField) {
    return [
      ...existingIntervals,
      { 
        start: Date.now(),
        startTime: Date.now(),
        endTime: null,
        isGoalkeeper: player.isGoalkeeper 
      }
    ];
  }
  return existingIntervals;
}

export function closeLastInterval(existingIntervals: any[], isRunning: boolean): any[] {
  if (isRunning && existingIntervals.length > 0 && existingIntervals[existingIntervals.length - 1].endTime === null) {
    return [
      ...existingIntervals.slice(0, existingIntervals.length - 1),
      { 
        ...existingIntervals[existingIntervals.length - 1], 
        endTime: Date.now() 
      }
    ];
  }
  return existingIntervals;
}