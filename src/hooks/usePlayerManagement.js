import { createSignal, createEffect } from 'solid-js';

function usePlayerManagement({ playerData, setPlayerData, includeGKPlaytime, isRunning, now }) {
  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const getTotalPlayTime = (player) => {
    now();
    let total = 0;
    for (const interval of player.playIntervals) {
      if (!includeGKPlaytime() && interval.isGoalkeeper) {
        continue;
      }
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning() ? now() - interval.startTime : 0;
      }
    }
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      () =>
        playerData()
          .filter((player) => player.isOnField)
          .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      () =>
        playerData()
          .filter((player) => !player.isOnField)
          .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  createEffect(() => {
    updatePlayerLists();
  });

  return {
    onFieldPlayers,
    offFieldPlayers,
    updatePlayerLists,
    getTotalPlayTime,
  };
}

export default usePlayerManagement;