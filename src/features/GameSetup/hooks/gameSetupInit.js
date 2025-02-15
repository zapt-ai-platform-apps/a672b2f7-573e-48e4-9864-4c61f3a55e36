export function getInitialPlayers(selectedSquad) {
  return selectedSquad.players.map(player => player.name);
}