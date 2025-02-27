import { useState } from 'react';
import { Player, Goal } from '../types/GameTypes';
import useGameTimer from './useGameTimer';
import * as Sentry from '@sentry/browser';

export function useGameManagement() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  
  // Add timer controls using useGameTimer hook
  const timerControls = useGameTimer();
  const isGameRunning = timerControls.isRunning;
  const gameTime = timerControls.timeElapsed;
  
  // Player management functions
  const playerManager = {
    addPlayer: (player: Partial<Player>) => {
      try {
        setPlayerData(prev => [
          ...prev,
          {
            ...player,
            id: player.id || Math.random().toString(36).substring(2, 9),
            position: player.position || { x: 0, y: 0 },
            isOnField: player.isOnField || false,
            isGoalkeeper: player.isGoalkeeper || false,
            totalPlayTime: player.totalPlayTime || 0
          } as Player
        ]);
      } catch (error) {
        console.error('Error adding player:', error);
        Sentry.captureException(error);
      }
    },
    deletePlayer: (playerId: string) => {
      try {
        setPlayerData(prev => prev.filter(p => p.id !== playerId));
      } catch (error) {
        console.error('Error deleting player:', error);
        Sentry.captureException(error);
      }
    }
  };
  
  /**
   * Handle starting the game with selected players
   * @param players The array of players
   * @param selectedGoalkeeper The selected goalkeeper
   * @param includeGoalkeeperPlaytime Whether to include goalkeeper in playtime calculations
   */
  const handleStartGame = (players: Player[], selectedGoalkeeper: Player | null, includeGoalkeeperPlaytime: boolean): void => {
    try {
      console.log('Starting game with players:', players);
      console.log('Selected goalkeeper:', selectedGoalkeeper);
      
      if (!players || players.length === 0) {
        console.error('No players provided to start game');
        return;
      }
      
      // Make sure to explicitly set the goalkeeper's isGoalkeeper property
      const updatedPlayers = players.map(player => {
        // Check if this player is the goalkeeper
        const isGK = selectedGoalkeeper && player.id === selectedGoalkeeper.id;
        
        return {
          ...player,
          // If this is the goalkeeper, make sure isGoalkeeper is true
          isGoalkeeper: isGK || false,
          // Filter players based on their isStartingPlayer property
          isOnField: !!player.isStartingPlayer
        };
      });
      
      // Set goalkeeper state
      if (selectedGoalkeeper) {
        // Make sure the goalkeeper object being set has isGoalkeeper: true
        const updatedGoalkeeper = {
          ...selectedGoalkeeper,
          isGoalkeeper: true
        };
        setGoalkeeper(updatedGoalkeeper);
      } else {
        setGoalkeeper(null);
      }
      
      // Update other game state
      setPlayerData(updatedPlayers);
      setIncludeGKPlaytime(includeGoalkeeperPlaytime);
      
      console.log('Game started with updated players:', updatedPlayers);
    } catch (error) {
      console.error('Error starting game:', error);
      Sentry.captureException(error);
    }
  };
  
  /**
   * Reset the game state
   */
  const resetGame = (): void => {
    setPlayerData([]);
    setGoalkeeper(null);
    setIncludeGKPlaytime(true);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    timerControls.resetTimer();
  };

  return {
    // Original state and functions
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    handleStartGame,
    resetGame,
    
    // New properties expected by tests
    gameTime,
    isGameRunning,
    timerControls,
    playerManager
  };
}

export default useGameManagement;