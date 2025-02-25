export interface GameInterval {
  startTime: number;
  endTime: number | null;
  start?: number; // Optional for compatibility with different functions
}

export function getValidIntervals(intervals: any[]): GameInterval[] {
  if (!intervals || intervals.length === 0) {
    return [];
  }
  
  return intervals.map(interval => ({
    startTime: interval.startTime ?? interval.start ?? Date.now(),
    endTime: interval.endTime ?? interval.end ?? null,
    start: interval.start ?? interval.startTime ?? Date.now() // Ensure start is always a number
  }));
}