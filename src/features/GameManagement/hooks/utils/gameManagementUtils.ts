export interface GameInterval {
  startTime: number;
  endTime: number | null;
  start?: number; // Added to ensure compatibility with timer logic functions
}

export function getValidIntervals(intervals: any[]): GameInterval[] {
  return intervals.map(interval => ({
    startTime: interval.startTime ?? interval.start ?? Date.now(),
    endTime: interval.endTime ?? interval.end ?? null,
    start: interval.start ?? interval.startTime ?? Date.now() // Added to ensure start property is always present
  }));
}