import { useState } from 'react';
import { toast } from 'react-toastify';

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

    const updatedPlayers = playerData.map(player => {
      if (player.id === selectedSubOffPlayer.id) {
        return { 
          ...selectedSubOnPlayer,
          isOnField: true,
          playIntervals: isRunning ? [
            ...selectedSubOnPlayer.playIntervals,
            { startTime: Date.now(), endTime: null }
          ] : selectedSubOnPlayer.playIntervals
        };
      }
      if (player.id === selectedSubOnPlayer.id) {
        return { 
          ...selectedSubOffPlayer,
          isOnField: false,
          playIntervals: isRunning ? [
            ...selectedSubOffPlayer.playIntervals,
            { startTime: Date.now(), endTime: Date.now() }
          ] : selectedSubOffPlayer.playIntervals
        };
      }
      return player;
    });

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