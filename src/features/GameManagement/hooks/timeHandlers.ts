import { Interval } from '../../../shared/models/timeUtils';

// Calculate playtimes from a list of intervals
export const calculatePlaytimes = (intervals: Interval[]): number => {
  return intervals.reduce((total, interval) => {
    if (interval.end === null || interval.end === undefined) return total;
    return total + (interval.end - interval.start);
  }, 0);
};

// Format playtime intervals for display or processing
export const formatPlaytimeIntervals = (intervals: Interval[]): Interval[] => {
  return intervals.map(interval => ({
    start: interval.start || 0,
    end: interval.end || null
  }));
};

// Get the currently active interval (if any)
export const getActiveInterval = (intervals: Interval[]): Interval | null => {
  if (intervals.length === 0) return null;
  
  const lastInterval = intervals[intervals.length - 1];
  if (lastInterval.end === null || lastInterval.end === undefined) {
    return lastInterval;
  }
  
  return null;
};