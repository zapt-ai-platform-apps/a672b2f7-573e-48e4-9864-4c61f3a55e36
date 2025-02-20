import { useState } from 'react';
import { useStateContext } from '../../../state';
import { Player } from '../../../context/StateContext';
import {
  getTotalPlayTimeHandler,
  getTimeElapsedHandler,
  toggleTimerHandler,
  recordGoalHandler,
  handlePlayerAdjustmentHandler,
  updatePlayerListsHandler
} from './gameManagementLogicHelpers';

interface PlayerLists {
  onField: Player[];
  offField: Player[];
}

interface UseGameManagementLogicReturn {
  playerData: Player[];
  setPlayerData: React.Dispatch<React.SetStateAction<Player[]>>;
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTotalPlayTime: (player: Player) => number;
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
  updatePlayerLists: () => PlayerLists;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
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
  const [gameIntervals, setGameIntervals] = useState<number[]>([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);

  const getTotalPlayTimeFunc = (player: Player): number => {
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
    setPlayerData((prev: Player[]) => handlePlayerAdjustmentHandler(prev, playerId, isAdding));
  };

  const updatePlayerListsFunc = (): PlayerLists => {
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