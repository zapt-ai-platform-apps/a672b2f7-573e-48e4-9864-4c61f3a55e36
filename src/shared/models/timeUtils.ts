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

// Calculate total play time for a player
export const calculateTotalPlayTime = (player: any, includeGKPlaytime: boolean, isRunning: boolean): number => {
  if (!player || !player.playIntervals) return 0;
  
  let totalTime = 0;
  
  for (const interval of player.playIntervals) {
    // Skip goalkeeper intervals if not including goalkeeper playtime
    if (!includeGKPlaytime && interval.isGoalkeeper) continue;
    
    const start = interval.start || interval.startTime || 0;
    const end = interval.end || interval.endTime;
    
    if (typeof end !== 'undefined') {
      totalTime += end - start;
    } else if (isRunning && player.isOnField) {
      // For active players with open intervals, add current time
      totalTime += Date.now() - start;
    }
  }
  
  return Math.floor(totalTime / 1000); // Convert from ms to seconds
};

// Get time elapsed for game intervals
export const getTimeElapsed = (gameIntervals: any[], isRunning: boolean): number => {
  if (!gameIntervals || !gameIntervals.length) return 0;
  
  let totalElapsed = 0;
  
  gameIntervals.forEach((interval, index) => {
    const start = interval.startTime || interval.start || 0;
    const end = interval.endTime || interval.end;
    
    if (end) {
      totalElapsed += (end - start) / 1000; // Convert to seconds
    } else if (isRunning && index === gameIntervals.length - 1) {
      // For the active interval
      totalElapsed += (Date.now() - start) / 1000;
    }
  });
  
  return Math.floor(totalElapsed);
};

// Toggle timer state
export const toggleTimer = (isRunning: boolean, gameIntervals: any[]): any => {
  if (isRunning) {
    // Stop the timer
    const now = Date.now();
    const updatedIntervals = [...gameIntervals];
    
    if (updatedIntervals.length > 0) {
      const lastInterval = updatedIntervals[updatedIntervals.length - 1];
      updatedIntervals[updatedIntervals.length - 1] = {
        ...lastInterval,
        endTime: now
      };
    }
    
    return {
      isRunning: false,
      intervals: updatedIntervals
    };
  } else {
    // Start the timer
    const now = Date.now();
    return {
      isRunning: true,
      intervals: [...gameIntervals, { startTime: now }]
    };
  }
};