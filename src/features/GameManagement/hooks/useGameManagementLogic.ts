import { useState } from 'react';
import { useStateContext } from '../../../state';
import { Player } from '../../../types/GameTypes';
import {
  getTotalPlayTime,
  getTimeElapsed,
  toggleTimer,
  recordGoal,
  handlePlayerAdjustment,
  updatePlayerLists
} from './gameManagementOperations';

interface PlayerLists {
  onField: Player[];
  offField: Player[];
}

export interface UseGameManagementLogicReturn {
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
    return getTotalPlayTime(player, includeGKPlaytime, isRunning);
  };

  const getTimeElapsedFunc = (): number => {
    return getTimeElapsed(gameIntervals, isRunning);
  };

  const toggleTimerFunc = (): void => {
    const { newIntervals, newIsRunning } = toggleTimer(isRunning, gameIntervals);
    setGameIntervals(newIntervals);
    setIsRunning(newIsRunning);
  };

  const recordGoalFunc = (team: 'our' | 'opponent', scorerName: string): void => {
    const result = recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
    setOurScore(result.newOurScore);
    setOpponentScore(result.newOpponentScore);
    setGoals(result.newGoals);
  };

  const handlePlayerAdjustmentFunc = (playerId: number | string, isAdding: boolean): void => {
    setPlayerData((prev: Player[]) => handlePlayerAdjustment(prev, playerId, isAdding));
  };

  const updatePlayerListsFunc = (): { onField: Player[]; offField: Player[] } => {
    return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
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