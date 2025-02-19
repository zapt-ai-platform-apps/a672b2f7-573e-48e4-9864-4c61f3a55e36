export function handlePlayerAdjustment(playerData, playerId, isAdding) {
  return playerData.map(player => {
    if (player.id === playerId) {
      if (isAdding) {
        return { ...player, playTime: (player.playTime || 0) + 1 };
      } else {
        return { ...player, playTime: Math.max((player.playTime || 0) - 1, 0) };
      }
    }
    return player;
  });
}

export function applyPlayerAdjustment(playerData, adjustmentType, selectedPlayer, isRunning) {
  return playerData.map(player => {
    if (player.id === selectedPlayer.id) {
      if (adjustmentType === "increase") {
        const updatedIntervals = isRunning
          ? [...(player.playIntervals || []), { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }]
          : (player.playIntervals || []);
        return { ...player, isOnField: true, playIntervals: updatedIntervals };
      } else if (adjustmentType === "decrease") {
        let updatedIntervals = player.playIntervals || [];
        if (isRunning && updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
          updatedIntervals = [
            ...updatedIntervals.slice(0, -1),
            { ...updatedIntervals[updatedIntervals.length - 1], endTime: Date.now() }
          ];
        }
        return { ...player, isOnField: false, playIntervals: updatedIntervals };
      }
    }
    return player;
  });
}