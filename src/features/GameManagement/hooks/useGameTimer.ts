import { useState, useEffect } from 'react';

interface GameInterval {
  startTime: number;
  endTime: number | null;
}

interface GameTimerParams {
  isRunning?: boolean;
  gameIntervals?: GameInterval[];
}

/**
 * Hook to manage game timer functionality
 * @param params Object containing isRunning state and game intervals
 * @returns Timer-related functions and state
 */
function useGameTimer({ isRunning = false, gameIntervals = [] }: GameTimerParams = {}) {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(uiTimer);
  }, []);

  /**
   * Calculate the total time elapsed in the game
   * @returns Total time elapsed in seconds
   */
  const getTimeElapsed = (): number => {
    let total = 0;
    const intervals = Array.isArray(gameIntervals) ? gameIntervals : [];
    
    intervals.forEach((interval) => {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning ? Date.now() - interval.startTime : 0;
      }
    });
    
    return Math.floor(total / 1000);
  };

  /**
   * Toggle the timer running state
   * @returns Current timer state after toggling
   */
  const toggleTimer = (): boolean => {
    return !isRunning;
  };

  return { now, startUITimer: () => {}, getTimeElapsed, toggleTimer };
}

export default useGameTimer;