function getStartingPlayers(selectedSquad, matchSquad) {
  if (selectedSquad && selectedSquad.players) {
    return selectedSquad.players.map(player => ({
      ...player,
      isStartingPlayer: player.isStartingPlayer !== undefined ? player.isStartingPlayer : false
    }));
  }
  return [];
}

export default getStartingPlayers;