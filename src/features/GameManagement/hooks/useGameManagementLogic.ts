import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
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
  timeElapsed: number;
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
    resetGame,
    selectedSquad,
    goalkeeper,
    setGoalkeeper
  } = useStateContext();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameIntervals, setGameIntervals] = useState<any[]>([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(getTimeElapsed(gameIntervals, isRunning));
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, gameIntervals]);

  useEffect(() => {
    if (playerData.length === 0 && selectedSquad?.players?.length) {
      try {
        const initializedPlayers = selectedSquad.players.map(p => ({
          ...p,
          playIntervals: [],
          isOnField: p.isStartingPlayer
        }));
        setPlayerData(initializedPlayers);
        console.log('Initialized players from squad:', initializedPlayers);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Player initialization error:', error);
      }
    }
  }, [selectedSquad, setPlayerData, playerData.length]);

  const getTotalPlayTimeFunc = (player: Player): number => {
    return getTotalPlayTime(player, includeGKPlaytime, isRunning);
  };

  const getTimeElapsedFunc = (): number => {
    return getTimeElapsed(gameIntervals, isRunning);
  };

  const toggleTimerFunc = (): void => {
    try {
      const { newIntervals, newIsRunning } = toggleTimer(isRunning, gameIntervals);
      setGameIntervals(newIntervals);
      setIsRunning(newIsRunning);
      console.log('Timer toggled:', newIsRunning ? 'Started' : 'Paused', newIntervals);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Timer toggle error:', error);
    }
  };

  const recordGoalFunc = (team: 'our' | 'opponent', scorerName: string): void => {
    try {
      const result = recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
      setOurScore(result.newOurScore);
      setOpponentScore(result.newOpponentScore);
      setGoals(result.newGoals);
      console.log('Goal recorded:', result.newGoals);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Goal recording error:', error);
    }
  };

  const handlePlayerAdjustmentFunc = (playerId: number | string, isAdding: boolean): void => {
    try {
      setPlayerData(prev => handlePlayerAdjustment(prev, playerId, isAdding));
      console.log('Player adjusted:', playerId, isAdding ? 'added' : 'removed');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Player adjustment error:', error);
    }
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
    confirmEndGame: () => {
      resetGame();
      setGameIntervals([]);
      setTimeElapsed(0);
      setShowEndGameConfirm(false);
    },
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
    resetGame,
    timeElapsed
  };
}