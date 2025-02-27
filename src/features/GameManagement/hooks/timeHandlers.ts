import { GameInterval, convertIntervalsToTimeIntervals } from './intervalOperations';
import { TimeInterval } from '../../../shared/models/timeUtils';

// Fix: Ensure we properly convert GameInterval[] to TimeInterval[]
export const calculatePlaytimes = (intervals: GameInterval[]): number => {
  return intervals.reduce((total, interval) => {
    if (interval.end === null) return total;
    return total + (interval.end - interval.start);
  }, 0);
};

export const formatPlaytimeIntervals = (intervals: GameInterval[]): TimeInterval[] => {
  // Use the helper function to ensure proper conversion
  return convertIntervalsToTimeIntervals(intervals);
};

export const getActiveInterval = (intervals: GameInterval[]): GameInterval | null => {
  if (intervals.length === 0) return null;
  
  const lastInterval = intervals[intervals.length - 1];
  if (lastInterval.end === null) {
    return lastInterval;
  }
  
  return null;
};