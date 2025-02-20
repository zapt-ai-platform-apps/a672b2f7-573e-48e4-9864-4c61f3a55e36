function initializePlayers(squad: any): any[] {
  if (squad && Array.isArray(squad.players)) {
    return squad.players.map((player: any, index: number) => ({
      id: player.id ? player.id : String(index + 1),
      ...player,
      name: player.name ? player.name : `Player ${index + 1}`,
      isInMatchSquad: false
    }));
  }
  return [];
}

export default initializePlayers;