import { useEffect } from 'react';
import useGameTimer from './useGameTimer';
import usePlayerManagement from './usePlayerManagement';
import useGameIntervalsManager from './useGameIntervalsManager';
import useEndGameManager from './useEndGameManager';

function useGameManagementLogic(props) {
  const { playerData, setPlayerData, goalkeeper, setGoalkeeper, ourScore, setOurScore, opponentScore, setOpponentScore, goals, setGoals, includeGKPlaytime } = props;

  const { isRunning, setIsRunning, gameIntervals, setGameIntervals, toggleTimer } = useGameIntervalsManager({
    isRunning: props.isRunning,
    setIsRunning: props.setIsRunning,
    gameIntervals: props.gameIntervals,
    setGameIntervals: props.setGameIntervals,
    playerData,
    setPlayerData
  });

  const { handleEndGame, confirmEndGame, cancelEndGame } = useEndGameManager({
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals,
    playerData,
    setPlayerData,
    setShowEndGameConfirm: props.setShowEndGameConfirm
  });

  const { now, startUITimer, getTimeElapsed } = useGameTimer({ isRunning, gameIntervals });

  const { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime } = usePlayerManagement({
    playerData,
    setPlayerData,
    includeGKPlaytime,
    isRunning,
    now
  });

  useEffect(() => {
    updatePlayerLists();
    startUITimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    showEndGameConfirm: props.showEndGameConfirm,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer
  };
}

export default useGameManagementLogic;