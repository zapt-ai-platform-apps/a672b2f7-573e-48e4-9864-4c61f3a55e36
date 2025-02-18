import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { createPlayer } from '../../../shared/models/player';
import { 
  getTotalPlayTimeWrapper,
  updatePlayerListsLogic,
  getTimeElapsedWrapper,
  toggleTimerLogic,
  recordGoalForPlayerLogic,
  handlePlayerAdjustmentLogic
} from '../utils/gameManagementLogicUtils';

export function useGameManagementLogic() {
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
    currentSquad
  } = useStateContext();

  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals, setGameIntervals] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const getTotalPlayTime = (player) => {
    return getTotalPlayTimeWrapper(player, isRunning, includeGKPlaytime);
  };

  const updatePlayerLists = () => {
    return updatePlayerListsLogic(playerData, includeGKPlaytime, isRunning);
  };

  const getTimeElapsed = () => {
    return getTimeElapsedWrapper(gameIntervals, isRunning);
  };

  const toggleTimer = () => {
    setIsRunning(prev => toggleTimerLogic(prev, setGameIntervals, setPlayerData));
  };

  const handleEndGame = () => setShowEndGameConfirm(true);
  const confirmEndGame = () => setShowEndGameConfirm(false);
  const cancelEndGame = () => setShowEndGameConfirm(false);

  const recordGoal = (team, scorerName) => {
    const time = getTimeElapsed();
    if (team === 'our') {
      setOurScore(prev => prev + 1);
      setGoals(prev => [...prev, { team, scorerName, time }]);
    } else if (team === 'opponent') {
      setOpponentScore(prev => prev + 1);
      setGoals(prev => [...prev, { team, scorerName: null, time }]);
    }
  };

  const handlePlayerAdjustment = (playerId, isAdding) => {
    setPlayerData(prev => handlePlayerAdjustmentLogic(prev, playerId, isAdding));
  };

  useEffect(() => {
    if (currentSquad?.players) {
      const squadPlayers = currentSquad.players.map(name =>
        createPlayer({ name, isInMatchSquad: true, isInStartingLineup: true })
      );
      setPlayerData(prev => [
        ...prev.filter(p => p.isInMatchSquad),
        ...squadPlayers
      ]);
    }
  }, [currentSquad]);

  return {
    playerData,
    setPlayerData,
    isRunning,
    ourScore,
    opponentScore,
    getTotalPlayTime,
    getTimeElapsed,
    toggleTimer,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    showEndGameConfirm,
    showGoalModal,
    setShowGoalModal,
    recordGoal,
    handlePlayerAdjustment,
    updatePlayerLists: () => updatePlayerLists(),
    onFieldPlayers: updatePlayerLists().onField,
    offFieldPlayers: updatePlayerLists().offField
  };
}