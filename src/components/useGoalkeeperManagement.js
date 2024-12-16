import { createSignal } from 'solid-js';

function useGoalkeeperManagement(props) {
  const {
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    isRunning,
    includeGKPlaytime,
    updatePlayerLists,
    onFieldPlayers,
  } = props;

  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);

  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = goalkeeper();

    setPlayerData(
      playerData().map((player) => {
        if (player.name === playerName) {
          if (isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: true,
            });
          }
          return { ...player, isGoalkeeper: true };
        } else if (player.name === previousGoalkeeperName) {
          if (isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: false,
            });
          }
          return { ...player, isGoalkeeper: false };
        } else {
          return player;
        }
      })
    );

    setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);

    updatePlayerLists();
  };

  const availableGoalkeepers = () =>
    onFieldPlayers().filter((player) => player.name !== goalkeeper());

  return {
    showGKModal,
    setShowGKModal,
    showGKConfirmModal,
    setShowGKConfirmModal,
    selectedNewGoalkeeper,
    setSelectedNewGoalkeeper,
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers,
  };
}

export default useGoalkeeperManagement;