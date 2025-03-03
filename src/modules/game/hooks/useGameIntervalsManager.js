import { useCallback } from 'react';

export default function useGameIntervalsManager({ isRunning, setIsRunning, gameIntervals, setGameIntervals, playerData, setPlayerData }) {
  const toggleTimer = useCallback(() => {
    const currentTime = Date.now();
    
    if (!isRunning) {
      // Start the timer
      setIsRunning(true);
      
      // Add a new game interval
      setGameIntervals((prev) => [...prev, { startTime: currentTime, endTime: null }]);

      // Update on-field players to start new play intervals
      setPlayerData((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.isOnField) {
            const intervals = player.playIntervals || [];
            const lastInterval = intervals.length > 0 ? intervals[intervals.length - 1] : null;
            
            // Only add a new interval if the player doesn't have an active one
            if (!lastInterval || lastInterval.endTime !== null) {
              return {
                ...player,
                playIntervals: [
                  ...intervals,
                  { startTime: currentTime, endTime: null, isGoalkeeper: player.isGoalkeeper }
                ]
              };
            }
          }
          return player;
        })
      );
    } else {
      // Pause the timer
      setIsRunning(false);
      
      // End the current game interval
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && !interval.endTime
            ? { ...interval, endTime: currentTime }
            : interval
        )
      );

      // Update on-field players to end their current play intervals
      setPlayerData((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.isOnField) {
            const intervals = player.playIntervals || [];
            
            // End the current interval if it exists and is not already ended
            if (intervals.length > 0 && !intervals[intervals.length - 1].endTime) {
              return {
                ...player,
                playIntervals: intervals.map((interval, index) =>
                  index === intervals.length - 1 ? { ...interval, endTime: currentTime } : interval
                )
              };
            }
          }
          return player;
        })
      );
    }
  }, [isRunning, setIsRunning, setGameIntervals, setPlayerData]);

  return { toggleTimer };
}