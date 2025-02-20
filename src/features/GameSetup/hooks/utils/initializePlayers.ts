function initializePlayers(squad: any): any[] {
  if (squad && Array.isArray(squad.players)) {
    return squad.players.map((player: any) => ({
      ...player,
      isInMatchSquad: false
    }));
  }
  return [];
}

export default initializePlayers;