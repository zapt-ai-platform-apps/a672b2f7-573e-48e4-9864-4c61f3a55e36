import { useState, useEffect } from 'react';

interface UsePlayerManagementParams {
  playerData: any[];
  setPlayerData: (players: any[]) => void;
  includeGKPlaytime: boolean;
  isRunning: boolean;
  now: number;
}

function usePlayerManagement({ playerData = [], setPlayerData, includeGKPlaytime, isRunning, now }: UsePlayerManagementParams) {
  const [onFieldPlayers, setOnFieldPlayers] = useState<any[]>([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState<any[]>([]);

  const getTotalPlayTime = (player: any): number => {
    let total = 0;
    player.playIntervals.forEach((interval: any) => {
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning ? now - interval.startTime : 0;
      }
    });
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      playerData
        .filter((player: any) => player.isOnField)
        .sort((a: any, b: any) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      playerData
        .filter((player: any) => !player.isOnField)
        .sort((a: any, b: any) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  useEffect(() => {
    updatePlayerLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData, now]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;