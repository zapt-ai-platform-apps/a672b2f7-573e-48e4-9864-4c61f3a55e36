import { useState, useEffect, useCallback } from 'react';
import * as Sentry from '@sentry/browser';
import { useStateContext } from '../../../hooks/useStateContext';
import { Player } from '../../../types/GameTypes';
import { getTotalPlayTime, formatTime } from '../../../models/timeUtils';
import { computeTimeElapsed, toggleTimerLogic, getValidIntervals, GameInterval } from './gameTimerLogic';
import { recordGoalLogic, handlePlayerAdjustmentLogic, updatePlayerListsLogic } from './gameScoreAndPlayerLogic';

export interface UseGameManagementLogicReturn {
  playerData: Player[];
  setPlayerData: React.Dispatch<React.SetStateAction<Player[]>>;
  isRunning: boolean;
  ourScore: number;
  opponentScore: number;
  getTotalPlayTime: (player: Player) => number;
  getTimeElapsed: () => string;
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

/**
 * Converts position string values (like '35%') to numeric values
 */
const parsePositionToNumeric = (position: any): { x: number, y: number } => {
  if (!position) {
    return {
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40
    };
  }

  const x = typeof position.x === 'string' 
    ? parseFloat(position.x) 
    : (typeof position.x === 'number' ? position.x : 30 + Math.random() * 40);
  
  const y = typeof position.y === 'string' 
    ? parseFloat(position.y) 
    : (typeof position.y === 'number' ? position.y : 30 + Math.random() * 40);

  return { x, y };
};

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
  const [playerLists, setPlayerLists] = useState<{ onField: Player[]; offField: Player[] }>({ onField: [], offField: [] });

  // Function to update player times based on current game state
  const updatePlayerTimes = useCallback(() => {
    setPlayerData(currentPlayers => 
      currentPlayers.map(player => {
        // Only update if the player is on field and game is running
        if (player.isOnField && isRunning) {
          // Calculate updated play time
          const updatedPlayTime = getTotalPlayTime(
            player, 
            includeGKPlaytime ?? false, 
            isRunning
          );
          
          return {
            ...player,
            totalPlayTime: updatedPlayTime
          };
        }
        return player;
      })
    );
  }, [isRunning, includeGKPlaytime, setPlayerData]);

  // Initialize players from selected squad
  useEffect(() => {
    if (playerData.length === 0 && selectedSquad) {
      try {
        let squadPlayers: Player[] = [];
        if (Array.isArray(selectedSquad)) {
          squadPlayers = selectedSquad;
        } else if (selectedSquad.players) {
          squadPlayers = typeof selectedSquad.players === 'string' 
            ? JSON.parse(selectedSquad.players) 
            : selectedSquad.players;
        }
        const initializedPlayers = squadPlayers.map((p: Player) => ({
          ...p,
          playIntervals: [],
          isOnField: p.isStartingPlayer ?? false,
          // Add default positions for on-field players to ensure they appear on the pitch
          position: p.isStartingPlayer ? parsePositionToNumeric(p.position) : undefined
        }));
        setPlayerData(initializedPlayers);
        console.log('Initialized players from squad with positions:', initializedPlayers);
      } catch (error) {
        Sentry.captureException(error);
        console.error('Player initialization error:', error);
      }
    }
  }, [selectedSquad, setPlayerData, playerData.length]);

  // Update player lists when player data changes
  useEffect(() => {
    const lists = updatePlayerListsLogic(playerData, includeGKPlaytime ?? false, isRunning);
    setPlayerLists(lists);
    console.log('Updated player lists:', lists);
  }, [playerData, includeGKPlaytime, isRunning]);

  // Game timer for overall game time
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        const validIntervals = getValidIntervals(gameIntervals);
        setTimeElapsed(computeTimeElapsed(validIntervals, isRunning));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, gameIntervals]);

  // Player time updating timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      // Update player times immediately
      updatePlayerTimes();
      
      // Then set up interval to update every second
      interval = setInterval(() => {
        updatePlayerTimes();
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, updatePlayerTimes]);

  const getTotalPlayTimeFunc = (player: Player): number => {
    return getTotalPlayTime(player, includeGKPlaytime ?? false, isRunning);
  };

  const getTimeElapsedFunc = (): string => {
    const validIntervals = getValidIntervals(gameIntervals);
    const elapsed = computeTimeElapsed(validIntervals, isRunning);
    return formatTime(elapsed);
  };

  const toggleTimerFunc = (): void => {
    try {
      const result = toggleTimerLogic(isRunning, gameIntervals);
      setGameIntervals(result.newIntervals);
      setIsRunning(result.newIsRunning);
      
      // When starting timer, update player intervals for those on the field
      if (!isRunning) {
        const now = Date.now();
        setPlayerData(currentPlayers => 
          currentPlayers.map(player => {
            if (player.isOnField) {
              return {
                ...player,
                playIntervals: [
                  ...(player.playIntervals || []),
                  {
                    start: now,
                    end: undefined, // Changed from null to undefined
                    isGoalkeeper: player.isGoalkeeper || false
                  }
                ]
              };
            }
            return player;
          })
        );
      }
      // When stopping timer, close the open intervals
      else {
        const now = Date.now();
        setPlayerData(currentPlayers => 
          currentPlayers.map(player => {
            if (player.isOnField && player.playIntervals && player.playIntervals.length > 0) {
              const intervals = [...player.playIntervals];
              const lastInterval = intervals[intervals.length - 1];
              
              if (lastInterval && lastInterval.start && !lastInterval.end) {
                intervals[intervals.length - 1] = {
                  ...lastInterval,
                  end: now
                };
              }
              
              return {
                ...player,
                playIntervals: intervals
              };
            }
            return player;
          })
        );
      }
      
      console.log('Timer toggled:', result.newIsRunning ? 'Started' : 'Paused', result.newIntervals);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Timer toggle error:', error);
    }
  };

  const recordGoalFunc = (team: 'our' | 'opponent', scorerName: string): void => {
    try {
      const validIntervals = getValidIntervals(gameIntervals);
      const result = recordGoalLogic(team, scorerName, ourScore, opponentScore, goals, validIntervals, isRunning);
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
      setPlayerData((prev: Player[]) => {
        const updatedPlayers = handlePlayerAdjustmentLogic(prev, playerId, isAdding);
        
        // If adding player to field, generate a position if none exists
        if (isAdding) {
          return updatedPlayers.map(player => {
            if (player.id === playerId && !player.position) {
              return {
                ...player,
                position: parsePositionToNumeric(null) // Use the same function for consistency
              };
            }
            return player;
          });
        }
        
        return updatedPlayers;
      });
      console.log('Player adjusted:', playerId, isAdding ? 'added' : 'removed');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Player adjustment error:', error);
    }
  };

  const updatePlayerListsFunc = (): { onField: Player[]; offField: Player[] } => {
    const lists = updatePlayerListsLogic(playerData, includeGKPlaytime ?? false, isRunning);
    setPlayerLists(lists);
    return lists;
  };

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
    onFieldPlayers: playerLists.onField,
    offFieldPlayers: playerLists.offField,
    showAddPlayerModal,
    setShowAddPlayerModal,
    resetGame: resetGameFunc,
    timeElapsed
  };
}