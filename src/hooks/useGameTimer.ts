import { useState, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/browser';

interface Interval {
  startTime: number;
  endTime?: number; // Using undefined instead of null
}

const useGameTimer = () => {
  const [now, setNow] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameIntervals, setGameIntervals] = useState<Interval[]>([]);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Start the timer and record the start time
  const startTimer = useCallback(() => {
    try {
      setIsRunning(true);
      
      // Create new interval with only startTime property to ensure endTime is undefined
      const newInterval: Interval = { 
        startTime: Date.now()
        // No endTime property at all - this ensures it remains undefined
      };
      setGameIntervals(prev => [...prev, newInterval]);
    } catch (error) {
      console.error('Error starting timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Stop the timer and update the last interval with end time
  const stopTimer = useCallback(() => {
    try {
      setIsRunning(false);
      
      // Update the last interval with an end time
      setGameIntervals(prev => {
        if (prev.length === 0) return prev;
        
        const lastIndex = prev.length - 1;
        const updatedIntervals = [...prev];
        
        // Use definite assignment (Date.now()) to ensure it's not null or undefined
        updatedIntervals[lastIndex] = {
          ...updatedIntervals[lastIndex],
          endTime: Date.now()
        };
        
        return updatedIntervals;
      });
    } catch (error) {
      console.error('Error stopping timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Reset the timer completely
  const resetTimer = useCallback(() => {
    try {
      setNow(0);
      setTimeElapsed(0);
      setIsRunning(false);
      setGameIntervals([]);
    } catch (error) {
      console.error('Error resetting timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Calculate total elapsed time
  const getTimeElapsed = useCallback((): number => {
    try {
      // Base time is sum of completed intervals
      let total = gameIntervals.reduce((sum, interval) => {
        // If the interval has an end, add its duration
        if (interval.endTime !== undefined) {
          return sum + (interval.endTime - interval.startTime);
        }
        // Interval without end is still running, so calculate current duration
        else if (isRunning) {
          return sum + (Date.now() - interval.startTime);
        }
        return sum;
      }, 0);
      
      // Convert to seconds and return
      return Math.floor(total / 1000);
    } catch (error) {
      console.error('Error calculating elapsed time:', error);
      Sentry.captureException(error);
      return 0;
    }
  }, [gameIntervals, isRunning]);

  // For compatibility, also provide startUITimer function
  const startUITimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  // Update timeElapsed when timer is running
  useEffect(() => {
    let intervalId: number;
    
    if (isRunning) {
      // Update immediately to avoid delay
      setTimeElapsed(getTimeElapsed());
      
      // Then set up interval for regular updates
      intervalId = window.setInterval(() => {
        setNow(Date.now());
        setTimeElapsed(getTimeElapsed());
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, getTimeElapsed]);

  return {
    now,
    startUITimer,
    startTimer,
    stopTimer,
    resetTimer,
    getTimeElapsed,
    timeElapsed,
    gameIntervals,
    toggleTimer: () => {
      if (isRunning) {
        stopTimer();
      } else {
        startTimer();
      }
      return !isRunning;
    }
  };
};

export default useGameTimer;