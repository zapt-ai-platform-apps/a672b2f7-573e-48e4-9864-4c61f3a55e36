export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists,
}) {
  const updatedPlayerData = playerData.map((player) => {
    if (player.id === selectedSubOffPlayer.id) {
      return selectedSubOnPlayer;
    }
    return player;
  });
  setPlayerData(updatedPlayerData);
  if (typeof updatePlayerLists === 'function') {
    updatePlayerLists(updatedPlayerData);
  }
}