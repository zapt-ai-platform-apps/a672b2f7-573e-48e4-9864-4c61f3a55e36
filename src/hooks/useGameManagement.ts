import { useState } from 'react';
import { Player, Goal } from '../types/GameTypes';
import * as Sentry from '@sentry/browser';

export function useGameManagement() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  
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
  };

  return {
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
    resetGame
  };
}

export default useGameManagement;