import { useState } from 'react';
import { toast } from 'react-toastify';
import { performSubstitution } from '../../../shared/models/playerSubstitutions';

interface SubstitutionLogicParams {
  playerData: any[];
  setPlayerData: (players: any[]) => void;
  isRunning: boolean;
}

export function useSubstitutionLogic({ playerData, setPlayerData, isRunning }: SubstitutionLogicParams) {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState<any>(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState<any>(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState<boolean>(false);

  const handleSubOffPlayerClick = (player: any): void => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer) setShowSubstitutionConfirmModal(true);
  };

  const handleSubOnPlayerClick = (player: any): void => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer) setShowSubstitutionConfirmModal(true);
  };

  const confirmSubstitution = (): void => {
    if (!selectedSubOffPlayer || !selectedSubOnPlayer) return;
    const updatedPlayers = performSubstitution(playerData, selectedSubOffPlayer, selectedSubOnPlayer, isRunning);
    setPlayerData(updatedPlayers);
    toast.success('Substitution successful!');
    setShowSubstitutionConfirmModal(false);
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
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