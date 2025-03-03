import { useState } from 'react';
import { makeSubstitution } from '@/modules/game/utils/substitutionHandlers';

export function useSubstitutionLogic({ playerData, setPlayerData, isRunning, updatePlayerLists }) {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState(false);

  const handleSubOffPlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const handleSubOnPlayerClick = (player) => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const confirmSubstitution = () => {
    if (selectedSubOffPlayer && selectedSubOnPlayer) {
      makeSubstitution({
        playerData,
        setPlayerData,
        selectedSubOffPlayer,
        selectedSubOnPlayer,
        isRunning,
        updatePlayerLists
      });
      
      setSelectedSubOffPlayer(null);
      setSelectedSubOnPlayer(null);
      setShowSubstitutionConfirmModal(false);
    }
  };

  const cancelSubstitution = () => {
    setSelectedSubOffPlayer(null);
    setSelectedSubOnPlayer(null);
    setShowSubstitutionConfirmModal(false);
  };

  return {
    selectedSubOffPlayer,
    setSelectedSubOffPlayer,
    selectedSubOnPlayer,
    setSelectedSubOnPlayer,
    showSubstitutionConfirmModal,
    setShowSubstitutionConfirmModal,
    confirmSubstitution,
    cancelSubstitution,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
  };
}