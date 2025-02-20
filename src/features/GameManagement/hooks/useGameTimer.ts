import { useState, useEffect } from 'react';

interface Interval {
  startTime: number;
  endTime?: number | null;
}

function useGameTimer({ isRunning, gameIntervals }: { isRunning: boolean; gameIntervals: Interval[] }) {
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
    intervals.forEach(interval => {
      if (interval.endTime) {
        total += (interval.endTime as number) - interval.startTime;
      } else {
        total += isRunning ? Date.now() - interval.startTime : 0;
      }
    });
    return Math.floor(total / 1000);
  };

  return { now, startUITimer: () => {}, getTimeElapsed };
}

export default useGameTimer;