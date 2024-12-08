function useGameIntervalsManager({ isRunning, setIsRunning, gameIntervals, setGameIntervals, playerData, setPlayerData }) {
  const toggleTimer = () => {
    if (!isRunning()) {
      setIsRunning(true);
      setGameIntervals((prev) => [...prev, { startTime: Date.now(), endTime: null }]);

      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField) {
            if (
              player.playIntervals.length === 0 ||
              player.playIntervals[player.playIntervals.length - 1].endTime !== null
            ) {
              player.playIntervals.push({
                startTime: Date.now(),
                endTime: null,
                isGoalkeeper: player.isGoalkeeper,
              });
            }
          }
          return player;
        })
      );
    } else {
      setIsRunning(false);
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && interval.endTime === null
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
          }
          return player;
        })
      );
    }
  };

  return {
    toggleTimer,
  };
}

export default useGameIntervalsManager;