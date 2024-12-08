import { createSignal, onMount } from 'solid-js';
import useGameTimer from './useGameTimer';
import usePlayerManagement from './usePlayerManagement';

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
  const [showEndGameConfirm, setShowEndGameConfirm] = createSignal(false);

  const { now, startUITimer, getTimeElapsed } = useGameTimer({ isRunning, gameIntervals });
  const {
    onFieldPlayers,
    offFieldPlayers,
    updatePlayerLists,
    getTotalPlayTime,
  } = usePlayerManagement({
    playerData,
    setPlayerData,
    includeGKPlaytime,
    isRunning,
    now,
  });

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

  onMount(() => {
    updatePlayerLists();
    startUITimer();
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