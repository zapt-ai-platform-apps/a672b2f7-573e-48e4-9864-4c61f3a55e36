import { useState } from 'react';
import { toast } from 'react-toastify';
import { performSubstitution } from '../../../shared/models/playerSubstitutions.js';

/**
 * Custom hook to manage player substitution logic.
 *
 * @param {Object} params - Contains playerData, setPlayerData, and isRunning flag.
 * @returns {Object} Handlers and state for managing substitutions.
 */
export function useSubstitutionLogic({ playerData, setPlayerData, isRunning }) {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState(false);

  const handleSubOffPlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer) setShowSubstitutionConfirmModal(true);
  };

  const handleSubOnPlayerClick = (player) => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer) setShowSubstitutionConfirmModal(true);
  };

  const confirmSubstitution = () => {
    if (!selectedSubOffPlayer || !selectedSubOnPlayer) return;
    const updatedPlayers = performSubstitution(playerData, selectedSubOffPlayer, selectedSubOnPlayer, isRunning);
    setPlayerData(updatedPlayers);
    toast.success('Substitution successful!');
    setShowSubstitutionConfirmModal(false);
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
  };

  const cancelSubstitution = () => {
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