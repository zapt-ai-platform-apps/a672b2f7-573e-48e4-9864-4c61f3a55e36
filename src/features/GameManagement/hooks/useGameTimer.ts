import { useState, useEffect, useCallback } from 'react';

export interface GameInterval {
  startTime: number;
  endTime: number | null;
}

interface GameTimerParams {
  isRunning?: boolean;
  initialIntervals?: GameInterval[];
}

/**
 * Hook to manage game timer functionality
 * @param params Object containing isRunning state and initial game intervals
 * @returns Timer-related functions and state
 */
function useGameTimer({ isRunning: initialIsRunning = false, initialIntervals = [] }: GameTimerParams = {}) {
  const [now, setNow] = useState<number>(Date.now());
  const [gameIntervals, setGameIntervals] = useState<GameInterval[]>(initialIntervals);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [internalIsRunning, setInternalIsRunning] = useState<boolean>(initialIsRunning);

  // Update UI every second
  useEffect(() => {
    const uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(uiTimer);
  }, []);

  // Calculate time elapsed whenever intervals change or timer is running
  useEffect(() => {
    // Update the elapsed time if the timer is running
    if (internalIsRunning) {
      const intervalId = setInterval(() => {
        setTimeElapsed(getTimeElapsed());
      }, 1000);
      
      return () => clearInterval(intervalId);
    }
    
    // Still update once if the timer is stopped
    setTimeElapsed(getTimeElapsed());
  }, [internalIsRunning, gameIntervals]);

  /**
   * Calculate the total time elapsed in the game
   * @returns Total time elapsed in seconds
   */
  const getTimeElapsed = useCallback((): number => {
    let total = 0;
    
    gameIntervals.forEach((interval) => {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (internalIsRunning) {
        total += Date.now() - interval.startTime;
      }
    });
    
    return Math.floor(total / 1000);
  }, [gameIntervals, internalIsRunning]);

  /**
   * Start the game timer
   */
  const startTimer = useCallback(() => {
    // Only add a new interval if the timer isn't already running
    if (!internalIsRunning) {
      setGameIntervals(intervals => [
        ...intervals,
        { startTime: Date.now(), endTime: null }
      ]);
      setInternalIsRunning(true);
    }
  }, [internalIsRunning]);

  /**
   * Stop the game timer
   */
  const stopTimer = useCallback(() => {
    if (internalIsRunning) {
      setGameIntervals(intervals => {
        const updatedIntervals = [...intervals];
        // Find the last interval that's still open
        const lastOpenIntervalIndex = updatedIntervals.findIndex(
          interval => interval.endTime === null
        );
        
        if (lastOpenIntervalIndex !== -1) {
          // Close the last open interval
          updatedIntervals[lastOpenIntervalIndex] = {
            ...updatedIntervals[lastOpenIntervalIndex],
            endTime: Date.now()
          };
        }
        
        return updatedIntervals;
      });
      setInternalIsRunning(false);
    }
  }, [internalIsRunning]);

  /**
   * Reset the game timer
   */
  const resetTimer = useCallback(() => {
    setGameIntervals([]);
    setTimeElapsed(0);
    setInternalIsRunning(false);
  }, []);

  /**
   * Toggle the timer running state
   */
  const toggleTimer = useCallback(() => {
    if (internalIsRunning) {
      stopTimer();
    } else {
      startTimer();
    }
    return !internalIsRunning;
  }, [internalIsRunning, startTimer, stopTimer]);

  return {
    now,
    startUITimer: () => {}, // Kept for backward compatibility
    getTimeElapsed,
    toggleTimer,
    timeElapsed,
    startTimer,
    stopTimer,
    resetTimer,
    gameIntervals
  };
}

export default useGameTimer;