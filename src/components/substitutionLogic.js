import { createSignal } from 'solid-js';

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

  const makeSubstitution = () => {
    if (selectedSubOffPlayer() && selectedSubOnPlayer()) {
      const offPlayerName = selectedSubOffPlayer().name;
      const onPlayerName = selectedSubOnPlayer().name;

      setPlayerData(
        playerData().map((player) => {
          if (player.name === offPlayerName) {
            if (player.playIntervals.length > 0) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          if (player.name === onPlayerName) {
            if (isRunning()) {
              return {
                ...player,
                isOnField: true,
                playIntervals: [
                  ...player.playIntervals,
                  { startTime: Date.now(), endTime: null },
                ],
              };
            } else {
              return {
                ...player,
                isOnField: true,
              };
            }
          }
          return player;
        })
      );
      updatePlayerLists();
    } else {
      alert('Please select a player to sub off and a player to sub on.');
    }
  };

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
    makeSubstitution();
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