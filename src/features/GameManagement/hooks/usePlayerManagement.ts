import { useState, useEffect } from 'react';

interface Player {
  playIntervals: Array<{ startTime: number; endTime?: number; isGoalkeeper?: boolean }>;
  isOnField: boolean;
  isInMatchSquad?: boolean;
  [key: string]: any;
}

interface UsePlayerManagementParams {
  playerData: Player[];
  setPlayerData: (players: Player[]) => void;
  includeGKPlaytime: boolean;
  isRunning: boolean;
  now: number;
}

function usePlayerManagement({ playerData, setPlayerData, includeGKPlaytime, isRunning, now }: UsePlayerManagementParams) {
  const [onFieldPlayers, setOnFieldPlayers] = useState<Player[]>([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState<Player[]>([]);

  const getTotalPlayTime = (player: Player): number => {
    let total = 0;
    player.playIntervals.forEach((interval) => {
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning ? now - interval.startTime : 0;
      }
    });
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = (): void => {
    setOnFieldPlayers(
      playerData
        .filter((player) => player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      playerData
        .filter((player) => !player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  useEffect(() => {
    updatePlayerLists();
  }, [playerData, now]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;