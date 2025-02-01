import { useState, useEffect } from 'react';

function useGameTimer({ isRunning, gameIntervals }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(uiTimer);
  }, []);

  const getTimeElapsed = () => {
    let total = 0;
    gameIntervals.forEach((interval) => {
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