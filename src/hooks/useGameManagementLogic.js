import {
  createSignal,
  onCleanup,
  createEffect,
  onMount,
} from 'solid-js';

function useGameManagementLogic(props) {
  const {
    numOnField,
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    includeGKPlaytime,
  } = props;

  const [isRunning, setIsRunning] = createSignal(false);
  const [gameIntervals, setGameIntervals] = createSignal([]);

  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const [showEndGameConfirm, setShowEndGameConfirm] = createSignal(false);

  const [now, setNow] = createSignal(Date.now());
  let uiTimer = null;

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

  const getTotalPlayTime = (player) => {
    now();
    let total = 0;
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning() ? now() - interval.startTime : 0;
      }
    }
    if (!includeGKPlaytime() && player.isGoalkeeper) {
      return 0;
    }
    return Math.floor(total / 1000);
  };

  const getTimeElapsed = () => {
    now();
    let total = 0;
    for (const interval of gameIntervals()) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning() ? now() - interval.startTime : 0;
      }
    }
    return Math.floor(total / 1000);
  };

  const startUITimer = () => {
    uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
  };

  const handleEndGame = () => {
    setShowEndGameConfirm(true);
  };

  const confirmEndGame = (navigate) => {
    if (isRunning()) {
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
          if (player.isOnField && (!player.isGoalkeeper || includeGKPlaytime())) {
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
    setShowEndGameConfirm(false);
    navigate('/summary');
  };

  const cancelEndGame = () => {
    setShowEndGameConfirm(false);
  };

  const toggleTimer = () => {
    if (!isRunning()) {
      setIsRunning(true);
      setGameIntervals((prev) => [...prev, { startTime: Date.now(), endTime: null }]);

      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField && (!player.isGoalkeeper || includeGKPlaytime())) {
            if (
              player.playIntervals.length === 0 ||
              player.playIntervals[player.playIntervals.length - 1].endTime !== null
            ) {
              player.playIntervals.push({ startTime: Date.now(), endTime: null });
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
          if (player.isOnField && (!player.isGoalkeeper || includeGKPlaytime())) {
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

  onMount(() => {
    updatePlayerLists();
    startUITimer();
  });

  onCleanup(() => {
    if (uiTimer !== null) {
      clearInterval(uiTimer);
    }
  });

  createEffect(() => {
    updatePlayerLists();
  });

  return {
    isRunning,
    gameIntervals,
    onFieldPlayers,
    offFieldPlayers,
    showEndGameConfirm,
    now,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    startUITimer,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer,
  };
}

export default useGameManagementLogic;