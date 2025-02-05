export function getInitialPlayers(selectedSquad) {
  return selectedSquad && Array.isArray(selectedSquad.players) ? selectedSquad.players : [];
}