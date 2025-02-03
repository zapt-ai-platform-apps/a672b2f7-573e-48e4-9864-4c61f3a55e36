export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}) {
  return (playerNameOptional) => {
    const name = playerNameOptional ? playerNameOptional : newPlayerName.trim();
    if (name !== "") {
      const minPlayTime =
        props.playerData.length > 0
          ? Math.min(...props.playerData.map((p) => p.totalPlayTime || 0))
          : 0;
      props.setPlayerData([
        ...props.playerData,
        {
          name,
          playIntervals: [],
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime
        }
      ]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}

export function createHandleIncreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

export function createHandleDecreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
}

export function createConfirmAdjustment({
  props,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}) {
  return () => {
    if (adjustType === "increase" && selectedPlayer) {
      props.setPlayerData(
        props.playerData.map((player) => {
          if (player.name === selectedPlayer.name) {
            if (props.isRunning) {
              return {
                ...player,
                isOnField: true,
                playIntervals: [
                  ...player.playIntervals,
                  { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }
                ]
              };
            } else {
              return { ...player, isOnField: true };
            }
          }
          return player;
        })
      );
      props.updatePlayerLists();
    } else if (adjustType === "decrease" && selectedPlayer) {
      props.setPlayerData(
        props.playerData.map((player) => {
          if (player.name === selectedPlayer.name) {
            if (
              player.playIntervals.length > 0 &&
              !player.playIntervals[player.playIntervals.length - 1].endTime
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          return player;
        })
      );
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}