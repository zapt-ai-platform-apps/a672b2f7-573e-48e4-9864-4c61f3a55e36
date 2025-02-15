export function getInitialPlayers(squad) {
  if (squad && Array.isArray(squad.players) && squad.players.length > 0) {
    // If the players are stored as strings, return them directly
    if (typeof squad.players[0] === 'string') {
      return squad.players;
    } else {
      // Otherwise, assume they are objects with a 'name' property
      return squad.players.map(player => player.name);
    }
  }
  return [];
}