function getStartingPlayers(selectedSquad, matchSquad) {
  if (selectedSquad && selectedSquad.players) {
    return selectedSquad.players;
  }
  return [];
}

export default getStartingPlayers;