export function getInitialPlayers(squad) {
  return squad.players.map(player => player.name);
}