import { useState } from 'react';
import { useStateContext } from '../../../state';
import {
  getTotalPlayTime as getTotalPlayTimeHandler,
  getTimeElapsed as getTimeElapsedHandler,
  toggleTimer as toggleTimerHandler,
  recordGoal as recordGoalHandler,
  handlePlayerAdjustment as handlePlayerAdjustmentHandler,
  updatePlayerLists as updatePlayerListsHandler
} from './gameManagementLogicHelpers';

interface UseGameManagementLogicReturn {
  playerData: any;
  setPlayerData: React.Dispatch<React.SetStateAction<any>>;
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTotalPlayTime: (player: any) => number;
  getTimeElapsed: () => number;
  toggleTimer: () => void;
  handleEndGame: () => void;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  showEndGameConfirm: boolean;
  showGoalModal: boolean;
  setShowGoalModal: React.Dispatch<React.SetStateAction<boolean>>;
  recordGoal: (team: 'our' | 'opponent', scorerName: string) => void;
  handlePlayerAdjustment: (playerId: number | string, isAdding: boolean) => void;
  updatePlayerLists: () => any;
  onFieldPlayers: any;
  offFieldPlayers: any;
  showAddPlayerModal: boolean;
  setShowAddPlayerModal: React.Dispatch<React.SetStateAction<boolean>>;
  resetGame: () => void;
}

export function useGameManagementLogic(): UseGameManagementLogicReturn {
  const {
    playerData,
    setPlayerData,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    includeGKPlaytime,
    resetGame
  } = useStateContext();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameIntervals, setGameIntervals] = useState<any[]>([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);

  const getTotalPlayTimeFunc = (player: any): number => {
    return getTotalPlayTimeHandler(player, includeGKPlaytime, isRunning);
  };

  const getTimeElapsedFunc = (): number => {
    return getTimeElapsedHandler(gameIntervals, isRunning);
  };

  const toggleTimerFunc = (): void => {
    const { newIntervals, newIsRunning } = toggleTimerHandler(isRunning, gameIntervals);
    setGameIntervals(newIntervals);
    setIsRunning(newIsRunning);
  };

  const recordGoalFunc = (team: 'our' | 'opponent', scorerName: string): void => {
    const result = recordGoalHandler(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
    setOurScore(result.newOurScore);
    setOpponentScore(result.newOpponentScore);
    setGoals(result.newGoals);
  };

  const handlePlayerAdjustmentFunc = (playerId: number | string, isAdding: boolean): void => {
    setPlayerData((prev: any[]) => handlePlayerAdjustmentHandler(prev, playerId, isAdding));
  };

  const updatePlayerListsFunc = (): any => {
    return updatePlayerListsHandler(playerData, includeGKPlaytime, isRunning);
  };

  const lists = updatePlayerListsFunc();

  return {
    playerData,
    setPlayerData,
    isRunning,
    ourScore,
    opponentScore,
    getTotalPlayTime: getTotalPlayTimeFunc,
    getTimeElapsed: getTimeElapsedFunc,
    toggleTimer: toggleTimerFunc,
    handleEndGame: () => setShowEndGameConfirm(true),
    confirmEndGame: () => setShowEndGameConfirm(false),
    cancelEndGame: () => setShowEndGameConfirm(false),
    showEndGameConfirm,
    showGoalModal,
    setShowGoalModal,
    recordGoal: recordGoalFunc,
    handlePlayerAdjustment: handlePlayerAdjustmentFunc,
    updatePlayerLists: updatePlayerListsFunc,
    onFieldPlayers: lists.onField,
    offFieldPlayers: lists.offField,
    showAddPlayerModal,
    setShowAddPlayerModal,
    resetGame
  };
}