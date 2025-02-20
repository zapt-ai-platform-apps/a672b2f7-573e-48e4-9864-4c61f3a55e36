import { useState, useEffect } from 'react';

interface UsePlayerManagementParams {
  playerData: any[];
  setPlayerData: (updater: (prev: any[]) => any[]) => void;
  includeGKPlaytime: boolean;
  isRunning: boolean;
  now: number;
}

function usePlayerManagement({ playerData, setPlayerData, includeGKPlaytime, isRunning, now }: UsePlayerManagementParams) {
  const [onFieldPlayers, setOnFieldPlayers] = useState<any[]>([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState<any[]>([]);

  const getTotalPlayTime = (player: any): number => {
    let total = 0;
    player.playIntervals.forEach((interval: { startTime: number; endTime?: number | null; isGoalkeeper?: boolean }) => {
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      if (interval.endTime) {
        total += (interval.endTime as number) - interval.startTime;
      } else {
        total += isRunning ? now - interval.startTime : 0;
      }
    });
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = (): void => {
    setOnFieldPlayers(
      playerData
        .filter(player => player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      playerData
        .filter(player => !player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  useEffect(() => {
    updatePlayerLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData, now]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;