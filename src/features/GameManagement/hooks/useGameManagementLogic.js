import { useState } from 'react';
import { useStateContext } from '@/state';
import useGameIntervalsManager from '@/features/GameManagement/hooks/useGameIntervalsManager';
import useEndGameManager from '@/features/GameManagement/hooks/useEndGameManager';
import useGameTimer from '@/features/GameManagement/hooks/useGameTimer';
import usePlayerManagement from '@/features/GameManagement/hooks/usePlayerManagement';

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

  const { now, getTimeElapsed } = useGameTimer({ isRunning, gameIntervals });
  const { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime } = usePlayerManagement({
    playerData,
    setPlayerData,
    includeGKPlaytime,
    isRunning,
    now
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
    toggleTimer
  };
}

export default useGameManagementLogic;