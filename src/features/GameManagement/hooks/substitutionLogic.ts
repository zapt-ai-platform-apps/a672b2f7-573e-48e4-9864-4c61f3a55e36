import { useState } from 'react';
import { toast } from 'react-toastify';
import { performSubstitution } from '../../../models/performSubstitution';
import type { Player } from '../../../types/GameTypes';

interface SubstitutionLogicParams {
  playerData: Player[];
  setPlayerData: (players: Player[]) => void;
  isRunning: boolean;
}

export function useSubstitutionLogic({ playerData, setPlayerData, isRunning }: SubstitutionLogicParams) {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState<Player | null>(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState<Player | null>(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState<boolean>(false);

  const handleSubOffPlayerClick = (player: Player): void => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer) setShowSubstitutionConfirmModal(true);
  };

  const handleSubOnPlayerClick = (player: Player): void => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer) setShowSubstitutionConfirmModal(true);
  };

  const confirmSubstitution = (): void => {
    if (!selectedSubOffPlayer || !selectedSubOnPlayer) return;
    
    try {
      // Ensure we're passing the correct types to performSubstitution
      const updatedPlayers = performSubstitution(
        playerData, 
        selectedSubOffPlayer, 
        selectedSubOnPlayer, 
        isRunning
      );
      
      setPlayerData(updatedPlayers);
      toast.success('Substitution successful!');
      setShowSubstitutionConfirmModal(false);
      setSelectedSubOffPlayer(null);
      setSelectedSubOnPlayer(null);
    } catch (error) {
      console.error('Error during substitution:', error);
      toast.error('Failed to perform substitution');
    }
  };

  const cancelSubstitution = (): void => {
    setShowSubstitutionConfirmModal(false);
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
  };

  return {
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
    confirmSubstitution,
    cancelSubstitution
  };
}