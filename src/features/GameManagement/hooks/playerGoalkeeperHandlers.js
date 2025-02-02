export function createGoalkeeperHandlers(props, setShowGKModal, setShowGKConfirmModal) {
  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = props.goalkeeper;
    props.setPlayerData(
      props.playerData.map((player) => {
        if (player.name === playerName) {
          if (props.isRunning && player.isOnField) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({ startTime: Date.now(), endTime: null, isGoalkeeper: true });
          }
          return { ...player, isGoalkeeper: true };
        } else if (player.name === previousGoalkeeperName) {
          if (props.isRunning && player.isOnField) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({ startTime: Date.now(), endTime: null, isGoalkeeper: false });
          }
          return { ...player, isGoalkeeper: false };
        } else {
          return player;
        }
      })
    );

    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    props.updatePlayerLists();
  };

  const availableGoalkeepers = () => {
    return props.onFieldPlayers.filter((player) => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}