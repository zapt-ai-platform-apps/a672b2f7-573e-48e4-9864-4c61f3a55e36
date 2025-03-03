import { useState, useEffect } from 'react';

function useGameTimer({ isRunning, gameIntervals }) {
  const [now, setNow] = useState(Date.now());
  
  // Update the 'now' timestamp every second when the game is running
  useEffect(() => {
    let timerId;
    
    if (isRunning) {
      // Update immediately on initial render
      setNow(Date.now());
      
      // Set up interval to update 'now' every second
      timerId = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    }
    
    // Clean up interval when component unmounts or dependencies change
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning]);

  // Calculate total elapsed time from all game intervals
  const getTimeElapsed = () => {
    let total = 0;
    const intervals = Array.isArray(gameIntervals) ? gameIntervals : [];
    
    intervals.forEach((interval) => {
      if (interval.endTime) {
        // For completed intervals, use the stored end time
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        // For active intervals, calculate using the current time
        total += now - interval.startTime;
      }
    });
    
    return Math.floor(total / 1000);
  };

  return { now, getTimeElapsed };
}

export default useGameTimer;