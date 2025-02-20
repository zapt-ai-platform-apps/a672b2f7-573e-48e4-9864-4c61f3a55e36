export function deletePlayer(
  playerId: string | number,
  setStartingPlayers: (update: (prev: any[]) => any[]) => void
): void {
  setStartingPlayers((prev) => prev.filter((player) => player.id !== playerId));
}

export function toggleStartingPlayer(
  playerId: string | number,
  setStartingPlayers: (update: (prev: any[]) => any[]) => void
): void {
  setStartingPlayers((prev) => {
    console.log("Toggling starting status for player:", playerId);
    return prev.map((player) => {
      if (String(player.id) === String(playerId)) {
        const newStartingStatus = !player.isStartingPlayer;
        if (newStartingStatus && !player.isInMatchSquad) {
          return { ...player, isStartingPlayer: true, isInMatchSquad: true };
        }
        return { ...player, isStartingPlayer: newStartingStatus };
      }
      return player;
    });
  });
}