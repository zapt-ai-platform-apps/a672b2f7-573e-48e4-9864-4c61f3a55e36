export function getInitialPlayers(selectedSquad) {
  if (selectedSquad && selectedSquad.players) {
    if (Array.isArray(selectedSquad.players)) {
      return selectedSquad.players.map(name => ({ name, isStartingPlayer: false }));
    } else {
      return selectedSquad.players
        .split(',')
        .map(p => p.trim())
        .filter(p => p)
        .map(name => ({ name, isStartingPlayer: false }));
    }
  }
  return [];
}