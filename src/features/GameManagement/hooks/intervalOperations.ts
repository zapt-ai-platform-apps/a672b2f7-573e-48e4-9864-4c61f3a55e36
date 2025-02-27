import { Interval, TimeInterval } from '../../../shared/models/timeUtils';

// Fix: Export getTimeElapsed directly to fix the import error
export function getTimeElapsed(intervals: Interval[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  
  intervals.forEach(interval => {
    if (interval.end) {
      total += (interval.end - interval.start);
    } else if (isRunning) {
      total += (now - interval.start);
    }
  });
  
  return Math.floor(total / 1000);
}

// Fix: Make Interval compatible with TimeInterval by changing how we define these types
// Instead of extending TimeInterval, create a separate interface with compatible properties
export interface GameInterval {
  start: number;
  end: number | null;
}

export const convertToTimeInterval = (interval: GameInterval): TimeInterval => {
  return {
    start: interval.start,
    end: interval.end ?? undefined,
  };
};

export const convertIntervalsToTimeIntervals = (intervals: GameInterval[]): TimeInterval[] => {
  return intervals.map(convertToTimeInterval);
};

export const createInterval = (start: number, end: number | null = null): GameInterval => {
  return { start, end };
};

export const updateIntervalEnd = (interval: GameInterval, end: number): GameInterval => {
  return { ...interval, end };
};

export const getTotalDuration = (intervals: GameInterval[]): number => {
  return intervals.reduce((total, interval) => {
    if (interval.end === null) return total;
    return total + (interval.end - interval.start);
  }, 0);
};