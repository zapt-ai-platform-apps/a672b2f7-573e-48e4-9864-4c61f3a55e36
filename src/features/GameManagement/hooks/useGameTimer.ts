import { useState, useEffect } from 'react';

interface GameTimerParams {
  isRunning: boolean;
  gameIntervals: Array<{ startTime: number; endTime: number | null }>;
}

function useGameTimer({ isRunning, gameIntervals }: GameTimerParams) {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(uiTimer);
  }, []);

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

  return { now, startUITimer: () => {}, getTimeElapsed };
}

export default useGameTimer;