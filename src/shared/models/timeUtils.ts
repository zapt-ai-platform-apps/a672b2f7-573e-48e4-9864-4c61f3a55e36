// Define the base TimeInterval interface
export interface TimeInterval {
  start: number;
  end: number | undefined;
}

// Define the Interval type that matches the actual usage pattern
// This is separate from TimeInterval to avoid type conflicts
export interface Interval {
  start: number;
  end: number | null;
}

export const createTimeInterval = (start: number, end?: number): TimeInterval => {
  return { start, end };
};

export const intervalToDuration = (interval: TimeInterval): number => {
  if (interval.end === undefined) return 0;
  return interval.end - interval.start;
};

export const getTotalIntervalsDuration = (intervals: TimeInterval[]): number => {
  return intervals.reduce((total, interval) => {
    return total + intervalToDuration(interval);
  }, 0);
};

// Helper to convert between types when needed
export const convertIntervalToTimeInterval = (interval: Interval): TimeInterval => {
  return {
    start: interval.start,
    end: interval.end ?? undefined
  };
};