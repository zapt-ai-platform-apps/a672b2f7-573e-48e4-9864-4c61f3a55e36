export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists,
}) {
  const newPlayerData = playerData.map((player) => {
    if (player.id === selectedSubOffPlayer.id) {
      return {
        ...selectedSubOnPlayer,
        substitutedIn: true,
      };
    }
    return player;
  });
  setPlayerData(newPlayerData);
  if (typeof updatePlayerLists === 'function') {
    updatePlayerLists(newPlayerData);
  }
}