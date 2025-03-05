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
  const addNewPlayer = (playerData) => {
    // If a player object is provided directly, use it
    if (playerData && typeof playerData === 'object' && playerData.name) {
      const minPlayTime =
        props.playerData.length > 0
          ? Math.min(...props.playerData.map((p) => p.totalPlayTime || 0))
          : 0;

      // Add the player with the provided data
      props.setPlayerData((prevPlayers) => [
        ...prevPlayers,
        {
          ...playerData,
          totalPlayTime: minPlayTime
        }
      ]);
      
      // Update UI state
      setNewPlayerName('');
      
      // This is the critical step - make sure player lists are updated
      // after the player data has been updated
      setTimeout(() => {
        props.updatePlayerLists();
      }, 0);
      
      setShowAddPlayerModal(false);
      return true;
    }
    
    // Fallback to the original behavior using state variable
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
      
      // Use setTimeout to ensure this runs after state updates
      setTimeout(() => {
        props.updatePlayerLists();
      }, 0);
      
      setShowAddPlayerModal(false);
      return true;
    }
    
    return false;
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