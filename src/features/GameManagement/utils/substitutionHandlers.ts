interface SubstitutionParams {
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
}: SubstitutionParams): void {
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