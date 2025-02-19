export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => player.isInMatchSquad);
  const offField = playerData.filter(player => !player.isInMatchSquad);
  return { onField, offField };
}

export function performSubstitution(playerData, selectedSubOffPlayer, selectedSubOnPlayer, isRunning) {
  return playerData.map(player => {
    if (player.id === selectedSubOffPlayer.id) {
      return {
        ...selectedSubOffPlayer,
        isOnField: false,
        playIntervals:
          isRunning &&
          selectedSubOffPlayer.playIntervals &&
          selectedSubOffPlayer.playIntervals.length > 0 &&
          !selectedSubOffPlayer.playIntervals[selectedSubOffPlayer.playIntervals.length - 1].endTime
            ? [
                ...selectedSubOffPlayer.playIntervals.slice(0, -1),
                { ...selectedSubOffPlayer.playIntervals[selectedSubOffPlayer.playIntervals.length - 1], endTime: Date.now() }
              ]
            : selectedSubOffPlayer.playIntervals
      };
    } else if (player.id === selectedSubOnPlayer.id) {
      return {
        ...selectedSubOnPlayer,
        isOnField: true,
        playIntervals: isRunning
          ? [...(selectedSubOnPlayer.playIntervals || []), { startTime: Date.now(), endTime: null }]
          : selectedSubOnPlayer.playIntervals
      };
    }
    return player;
  });
}