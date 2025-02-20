interface SubstitutionUtilsParams {
  playerData: any[];
  setPlayerData: (players: any[]) => void;
  selectedSubOffPlayer: any;
  selectedSubOnPlayer: any;
  isRunning: boolean;
  updatePlayerLists?: (players: any[]) => void;
}

export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists,
}: SubstitutionUtilsParams): void {
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