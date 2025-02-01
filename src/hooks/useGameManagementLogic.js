import { useEffect, useState } from 'react';
import { useStateContext } from '../state';
import useGameTimer from './useGameTimer';
import usePlayerManagement from './usePlayerManagement';
import useGameIntervalsManager from './useGameIntervalsManager';
import useEndGameManager from './useEndGameManager';

function useGameManagementLogic() {
  const { playerData, setPlayerData, goalkeeper, setGoalkeeper, ourScore, setOurScore, opponentScore, setOpponentScore, goals, setGoals, includeGKPlaytime } = useStateContext();

  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals, setGameIntervals] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);

  const { toggleTimer } = useGameIntervalsManager({
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals,
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
    setShowEndGameConfirm
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
  }, [updatePlayerLists, startUITimer]);

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
    toggleTimer
  };
}

export default useGameManagementLogic;