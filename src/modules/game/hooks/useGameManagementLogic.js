import { useState } from 'react';
import { useAppContext } from '@/app/context/AppProvider';
import useGameTimer from '@/modules/game/hooks/useGameTimer';
import usePlayerManagement from '@/modules/game/hooks/usePlayerManagement';
import useEndGameManager from '@/modules/game/hooks/useEndGameManager';

function useGameManagementLogic() {
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
    isRunning,
    setIsRunning,
    gameIntervals,
    setGameIntervals,
    resetGame,
    toggleTimer,
    endGame,
    getTimeElapsed,
    recordGoal,
    removeLastGoal
  } = useAppContext();

  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);

  const { now, getTimeElapsed: getElapsed } = useGameTimer({ isRunning, gameIntervals });
  const { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime } = usePlayerManagement({
    playerData,
    setPlayerData,
    includeGKPlaytime,
    isRunning,
    now
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
    resetGame,
    recordGoal,
    removeLastGoal,
    now
  };
}

export default useGameManagementLogic;