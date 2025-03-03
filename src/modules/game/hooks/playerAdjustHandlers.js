export function createPlayerAdjustHandlers({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal,
  setAdjustType,
  setShowAdjustModal,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}) {
  const addNewPlayer = () => {
    if (newPlayerName.trim() !== '') {
      const minPlayTime =
        props.playerData.length > 0
          ? Math.min(...props.playerData.map((p) => p.totalPlayTime || 0))
          : 0;

      props.setPlayerData((prevPlayers) => [
        ...prevPlayers,
        {
          name: newPlayerName.trim(),
          playIntervals: [],
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime
        }
      ]);
      setNewPlayerName('');
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };

  const handleIncreasePlayers = () => {
    setAdjustType('increase');
    setShowAdjustModal(true);
  };

  const handleDecreasePlayers = () => {
    setAdjustType('decrease');
    setShowAdjustModal(true);
  };

  const confirmAdjustment = () => {
    if (adjustType === 'increase' && selectedPlayer) {
      props.setPlayerData((prevPlayers) =>
        prevPlayers.map((player) => {
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
    } else if (adjustType === 'decrease' && selectedPlayer) {
      props.setPlayerData((prevPlayers) =>
        prevPlayers.map((player) => {
          if (player.name === selectedPlayer.name) {
            if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
              return {
                ...player,
                isOnField: false,
                playIntervals: player.playIntervals.map((interval, index) =>
                  index === player.playIntervals.length - 1 ? { ...interval, endTime: Date.now() } : interval
                )
              };
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

  return {
    addNewPlayer,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment
  };
}