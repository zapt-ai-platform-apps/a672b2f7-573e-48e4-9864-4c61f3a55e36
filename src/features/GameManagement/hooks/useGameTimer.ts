import { useState, useRef, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/browser';

export interface TimeInterval {
  startTime: number;
  endTime?: number;
}

/**
 * Custom hook for managing the game timer
 */
const useGameTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameIntervals, setGameIntervals] = useState<TimeInterval[]>([]);
  
  // Use a ref to track timer state across renders without triggering re-renders
  const timerRef = useRef<{
    timerId: number | null;
    lastStartTime: number | null;
  }>({
    timerId: null,
    lastStartTime: null
  });

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current.timerId !== undefined) {
        clearInterval(timerRef.current.timerId);
      }
    };
  }, []);

  /**
   * Starts the game timer
   */
  const startTimer = useCallback(() => {
    try {
      // If timer is already running, do nothing
      if (timerRef.current.timerId !== null) {
        console.log('Timer already running');
        return;
      }

      const now = Date.now();
      timerRef.current.lastStartTime = now;
      
      // Add a new interval to the gameIntervals array
      setGameIntervals(prevIntervals => [
        ...prevIntervals, 
        { startTime: now } // endTime is undefined initially
      ]);

      // Start the timer using setInterval
      const timerId = window.setInterval(() => {
        setTimeElapsed(prevTime => {
          const newTime = prevTime + 1; // Increment by 1 second
          return newTime;
        });
      }, 1000);

      timerRef.current.timerId = timerId;
      console.log('Timer started');
    } catch (error) {
      console.error('Error starting timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  /**
   * Stops the game timer
   */
  const stopTimer = useCallback(() => {
    try {
      // If timer is not running, do nothing
      if (timerRef.current.timerId === null) {
        console.log('Timer not running');
        return;
      }

      // Clear the interval
      clearInterval(timerRef.current.timerId);
      timerRef.current.timerId = null;

      const now = Date.now();
      
      // Update the last interval with an end time
      setGameIntervals(prevIntervals => {
        const updatedIntervals = [...prevIntervals];
        if (updatedIntervals.length > 0) {
          const lastInterval = updatedIntervals[updatedIntervals.length - 1];
          updatedIntervals[updatedIntervals.length - 1] = {
            ...lastInterval,
            endTime: now
          };
        }
        return updatedIntervals;
      });

      console.log('Timer stopped');
    } catch (error) {
      console.error('Error stopping timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  /**
   * Resets the game timer
   */
  const resetTimer = useCallback(() => {
    try {
      // Clear the interval if it's running
      if (timerRef.current.timerId !== undefined) {
        clearInterval(timerRef.current.timerId);
        timerRef.current.timerId = null;
      }

      // Reset state
      setTimeElapsed(0);
      setGameIntervals([]);
      timerRef.current.lastStartTime = null;
      
      console.log('Timer reset');
    } catch (error) {
      console.error('Error resetting timer:', error);
      Sentry.captureException(error);
    }
  }, []);

  /**
   * Toggles the timer between running and stopped states
   */
  const toggleTimer = useCallback(() => {
    try {
      if (timerRef.current.timerId === null) {
        startTimer();
      } else {
        stopTimer();
      }
    } catch (error) {
      console.error('Error toggling timer:', error);
      Sentry.captureException(error);
    }
  }, [startTimer, stopTimer]);

  /**
   * Returns the current time elapsed
   */
  const getTimeElapsed = useCallback(() => {
    return timeElapsed;
  }, [timeElapsed]);

  return {
    timeElapsed,
    gameIntervals,
    startTimer,
    stopTimer,
    resetTimer,
    toggleTimer,
    isRunning: timerRef.current.timerId !== null,
    getTimeElapsed
  };
};

export default useGameTimer;