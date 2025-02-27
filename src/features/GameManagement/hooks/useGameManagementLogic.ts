import { useState, useCallback } from 'react';
import { Player, Goal } from '../../../types/GameTypes';
import * as Sentry from '@sentry/browser';
import { removeLastGoal } from '../../../models/scoreCalculations';

export function useGameManagementLogic() {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState<Player | null>(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState<Player | null>(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState<boolean>(false);
  const [showAssignGkModal, setShowAssignGkModal] = useState<boolean>(false);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);

  // Function to handle removing the last goal
  const handleRemoveLastGoal = useCallback((goals: Goal[], ourScore: number, opponentScore: number, setGoals: (goals: Goal[]) => void, setOurScore: (score: number) => void, setOpponentScore: (score: number) => void) => {
    try {
      if (goals.length === 0) {
        console.log('No goals to remove');
        return;
      }
      
      const { newOurScore, newOpponentScore, newGoals } = removeLastGoal(goals, ourScore, opponentScore);
      
      setGoals(newGoals);
      setOurScore(newOurScore);
      setOpponentScore(newOpponentScore);
      
      console.log('Last goal removed successfully');
    } catch (error) {
      console.error('Error removing last goal:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Function to handle increasing players on the field
  const handleIncreasePlayers = useCallback((playerData: Player[], setPlayerData: (players: Player[]) => void) => {
    try {
      const benchPlayers = playerData.filter(player => !player.isOnField);
      
      if (benchPlayers.length === 0) {
        console.log('No bench players available to add to the field');
        return;
      }
      
      // Select the first bench player to add to the field
      const playerToAdd = benchPlayers[0];
      
      const updatedPlayers = playerData.map(player => 
        player.id === playerToAdd.id ? { ...player, isOnField: true } : player
      );
      
      setPlayerData(updatedPlayers);
      console.log(`Player ${playerToAdd.name} added to the field`);
    } catch (error) {
      console.error('Error increasing players:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Function to handle decreasing players on the field
  const handleDecreasePlayers = useCallback((playerData: Player[], setPlayerData: (players: Player[]) => void) => {
    try {
      const onFieldPlayers = playerData.filter(player => player.isOnField);
      
      if (onFieldPlayers.length <= 1) {
        console.log('Cannot reduce players below 1');
        return;
      }
      
      // Simple strategy: remove the last player that was added to the field
      const playerToRemove = onFieldPlayers[onFieldPlayers.length - 1];
      
      const updatedPlayers = playerData.map(player => 
        player.id === playerToRemove.id ? { ...player, isOnField: false } : player
      );
      
      setPlayerData(updatedPlayers);
      console.log(`Player ${playerToRemove.name} removed from the field`);
    } catch (error) {
      console.error('Error decreasing players:', error);
      Sentry.captureException(error);
    }
  }, []);

  // Handle substitution logic
  const handleSubOffPlayerClick = (player: Player): void => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer) setShowSubstitutionConfirmModal(true);
  };

  const handleSubOnPlayerClick = (player: Player): void => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer) setShowSubstitutionConfirmModal(true);
  };

  const confirmSubstitution = (): void => {
    // Substitution logic would go here
    setShowSubstitutionConfirmModal(false);
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
  };

  const cancelSubstitution = (): void => {
    setShowSubstitutionConfirmModal(false);
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
  };

  // Goalkeeper management
  const assignGoalkeeper = (): void => {
    setShowAssignGkModal(true);
  };

  const handleAssignGkConfirm = (playerId: string): void => {
    // Find the player with the given ID
    // This function now expects a player ID (string) rather than a Player object
    const foundPlayer = (playerData: Player[]): Player | null => {
      return playerData.find(p => p.id === playerId) || null;
    };
    
    // We would typically want to set the goalkeeper here
    // In a real implementation, we'd have playerData available here
    console.log(`Setting goalkeeper with ID: ${playerId}`);
    // Additional logic to update state would go here
  };

  return {
    handleRemoveLastGoal,
    handleIncreasePlayers,
    handleDecreasePlayers,
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
    confirmSubstitution,
    cancelSubstitution,
    assignGoalkeeper,
    showAssignGkModal,
    setShowAssignGkModal,
    handleAssignGkConfirm,
    currentGoalkeeper,
    showAddPlayerModal,
    setShowAddPlayerModal
  };
}

export default useGameManagementLogic;