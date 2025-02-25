import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { useStateContext } from '../../../hooks/useStateContext';
import { Player } from '../../../types/GameTypes';
import { getTotalPlayTime } from '../../../models/timeUtils';
import { computeTimeElapsed, toggleTimerLogic, GameInterval } from './gameTimerLogic';
import { recordGoalLogic, handlePlayerAdjustmentLogic, updatePlayerListsLogic } from './gameScoreAndPlayerLogic';

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
  handlePlayerAdjustment: (playerId: string | number, isAdding: boolean) => void;
  updatePlayerLists: () => { onField: Player[]; offField: Player[] };
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
    resetGame: contextResetGame,
    selectedSquad,
    goalkeeper,
    setGoalkeeper
  } = useStateContext();

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameIntervals, setGameIntervals] = useState<GameInterval[]>([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    setGameIntervals([]);
    setTimeElapsed(0);
    setIsRunning(false);
    console.log('Timer state reset on component mount');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(computeTimeElapsed(gameIntervals, isRunning));
      }, 1000);
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
          isOnField: p.isStartingPlayer ?? false
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
    return getTotalPlayTime(player, includeGKPlaytime ?? false, isRunning);
  };

  const getTimeElapsedFunc = (): number => {
    return computeTimeElapsed(gameIntervals, isRunning);
  };

  const toggleTimerFunc = (): void => {
    try {
      const result = toggleTimerLogic(isRunning, gameIntervals);
      setGameIntervals(result.newIntervals);
      setIsRunning(result.newIsRunning);
      console.log('Timer toggled:', result.newIsRunning ? 'Started' : 'Paused', result.newIntervals);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Timer toggle error:', error);
    }
  };

  const recordGoalFunc = (team: 'our' | 'opponent', scorerName: string): void => {
    try {
      const result = recordGoalLogic(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
      setOurScore(result.newOurScore);
      setOpponentScore(result.newOpponentScore);
      setGoals(result.newGoals);
      console.log('Goal recorded:', result.newGoals);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Goal recording error:', error);
    }
  };

  const handlePlayerAdjustmentFunc = (playerId: string | number, isAdding: boolean): void => {
    try {
      setPlayerData(prev => handlePlayerAdjustmentLogic(prev, playerId, isAdding));
      console.log('Player adjusted:', playerId, isAdding ? 'added' : 'removed');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Player adjustment error:', error);
    }
  };

  const updatePlayerListsFunc = (): { onField: Player[]; offField: Player[] } => {
    return updatePlayerListsLogic(playerData, includeGKPlaytime ?? false, isRunning);
  };

  const lists = updatePlayerListsFunc();

  const resetGameFunc = () => {
    contextResetGame();
    setGameIntervals([]);
    setTimeElapsed(0);
    setIsRunning(false);
    console.log('Game reset: Timer state cleared');
  };

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
      resetGameFunc();
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
    resetGame: resetGameFunc,
    timeElapsed
  };
}