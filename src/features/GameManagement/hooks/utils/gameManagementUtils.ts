export interface GameInterval {
  startTime: number;
  endTime: number | null;
}

export function getValidIntervals(intervals: any[]): GameInterval[] {
  return intervals.map(interval => ({
    startTime: interval.startTime ?? interval.start ?? Date.now(),
    endTime: interval.endTime ?? interval.end ?? null
  }));
}