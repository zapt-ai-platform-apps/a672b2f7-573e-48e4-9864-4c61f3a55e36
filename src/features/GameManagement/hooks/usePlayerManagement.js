import { useState, useEffect } from 'react';

function usePlayerManagement({ playerData = [], setPlayerData, includeGKPlaytime, isRunning, now }) {
  const [onFieldPlayers, setOnFieldPlayers] = useState([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);

  const getTotalPlayTime = (player) => {
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

  const updatePlayerLists = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData, now]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;