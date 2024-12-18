import { createSignal, onMount } from 'solid-js';
import useGameTimer from './useGameTimer';
import usePlayerManagement from './usePlayerManagement';
import useGameIntervalsManager from './useGameIntervalsManager';
import useEndGameManager from './useEndGameManager';

function useGameManagementLogic(props) {
  const {
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

  const { toggleTimer } = useGameIntervalsManager({
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals,
    playerData,
    setPlayerData,
  });

  const { handleEndGame, confirmEndGame, cancelEndGame } = useEndGameManager({
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals,
    playerData,
    setPlayerData,
    showEndGameConfirm,
    setShowEndGameConfirm,
  });

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

  onMount(() => {
    updatePlayerLists();
    startUITimer();
  });

  return {
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
    isRunning,
    gameIntervals,
    onFieldPlayers,
    offFieldPlayers,
    showEndGameConfirm,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer,
  };
}

export default useGameManagementLogic;