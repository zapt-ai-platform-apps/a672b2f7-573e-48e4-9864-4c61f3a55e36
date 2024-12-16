import { createSignal } from 'solid-js';
import { makeSubstitution } from '../utils/substitutionHandlers';
import { toast } from 'solid-toast';

export function useSubstitutionLogic(props) {
  const {
    playerData,
    setPlayerData,
    isRunning,
    updatePlayerLists,
  } = props;

  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = createSignal(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = createSignal(null);
  const [showSubstitutionConfirmModal, setShowSubstitutionConfirmModal] = createSignal(false);

  const handleSubOffPlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
    if (selectedSubOnPlayer()) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const handleSubOnPlayerClick = (player) => {
    setSelectedSubOnPlayer(player);
    if (selectedSubOffPlayer()) {
      setShowSubstitutionConfirmModal(true);
    }
  };

  const confirmSubstitution = () => {
    makeSubstitution({
      playerData,
      setPlayerData,
      selectedSubOffPlayer,
      selectedSubOnPlayer,
      isRunning,
      updatePlayerLists,
    });
    toast.success(`Substituted ${selectedSubOffPlayer().name} with ${selectedSubOnPlayer().name}!`);
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