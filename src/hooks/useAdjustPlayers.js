import { createSignal } from 'solid-js';

function useAdjustPlayers(props) {
  const {
    playerData,
    setPlayerData,
    onFieldPlayers,
    offFieldPlayers,
    isRunning,
    updatePlayerLists,
  } = props;

  const [showAdjustModal, setShowAdjustModal] = createSignal(false);
  const [adjustType, setAdjustType] = createSignal(null);
  const [selectedPlayer, setSelectedPlayer] = createSignal(null);
  const [showConfirmModal, setShowConfirmModal] = createSignal(false);

  const handleIncreasePlayers = () => {
    setAdjustType('increase');
    setShowAdjustModal(true);
  };

  const handleDecreasePlayers = () => {
    setAdjustType('decrease');
    setShowAdjustModal(true);
  };

  const confirmAdjustment = () => {
    if (adjustType() === 'increase' && selectedPlayer()) {
      // Add player to on-field
      setPlayerData(
        playerData().map((player) => {
          if (player.name === selectedPlayer().name) {
            if (isRunning()) {
              return {
                ...player,
                isOnField: true,
                playIntervals: [
                  ...player.playIntervals,
                  {
                    startTime: Date.now(),
                    endTime: null,
                    isGoalkeeper: player.isGoalkeeper,
                  },
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
    } else if (adjustType() === 'decrease' && selectedPlayer()) {
      // Remove player from on-field
      setPlayerData(
        playerData().map((player) => {
          if (player.name === selectedPlayer().name) {
            if (player.playIntervals.length > 0) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          return player;
        })
      );
      updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };

  return {
    showAdjustModal,
    setShowAdjustModal,
    adjustType,
    setAdjustType,
    selectedPlayer,
    setSelectedPlayer,
    showConfirmModal,
    setShowConfirmModal,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment,
    onFieldPlayers,
    offFieldPlayers,
  };
}

export default useAdjustPlayers;