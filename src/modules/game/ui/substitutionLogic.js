import { useState } from 'react';
import { makeSubstitution } from '../utils/substitutionHandlers';
import { toast } from 'react-toastify';

export function useSubstitutionLogic(props) {
  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = useState(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = useState(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = useState(false);

  const handleSubOffPlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer !== null) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const handleSubOnPlayerClick = (player) => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer !== null) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const confirmSubstitution = () => {
    makeSubstitution({
      playerData: props.playerData,
      setPlayerData: props.setPlayerData,
      selectedSubOffPlayer: selectedSubOffPlayer,
      selectedSubOnPlayer: selectedSubOnPlayer,
      isRunning: props.isRunning,
      updatePlayerLists: props.updatePlayerLists,
    });
    toast.success(`Substituted ${selectedSubOffPlayer.name} with ${selectedSubOnPlayer.name}!`);
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

export default useSubstitutionLogic;