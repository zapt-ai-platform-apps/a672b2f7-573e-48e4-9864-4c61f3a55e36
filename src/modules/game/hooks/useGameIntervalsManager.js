import { useCallback } from 'react';
import { useAppContext } from '@/app/context/AppProvider';

export default function useGameIntervalsManager({ isRunning, setIsRunning, gameIntervals, setGameIntervals, playerData, setPlayerData }) {
  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      setGameIntervals((prev) => [...prev, { startTime: Date.now(), endTime: null }]);

      setPlayerData(
        playerData.map((player) => {
          if (player.isOnField) {
            if (player.playIntervals.length === 0 || player.playIntervals[player.playIntervals.length - 1].endTime) {
              return {
                ...player,
                playIntervals: [
                  ...player.playIntervals,
                  { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }
                ]
              };
            }
          }
          return player;
        })
      );
    } else {
      setIsRunning(false);
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && !interval.endTime
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData.map((player) => {
          if (player.isOnField) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
          }
          return player;
        })
      );
    }
  }, [isRunning, playerData, setIsRunning, setGameIntervals, setPlayerData]);

  return { toggleTimer };
}