function toggleMatchPlayerHelper(players, playerId) {
  return players.map(player => {
    if (player.id === playerId) {
      const newInMatch = !player.isInMatchSquad;
      return { ...player, isInMatchSquad: newInMatch, isStartingPlayer: newInMatch ? player.isStartingPlayer : false };
    }
    return player;
  });
}

function toggleStartingPlayerHelper(players, playerId) {
  return players.map(player => {
    if (player.id === playerId) {
      const newStartingStatus = !player.isStartingPlayer;
      if (newStartingStatus && !player.isInMatchSquad) {
        return { ...player, isStartingPlayer: true, isInMatchSquad: true };
      }
      return { ...player, isStartingPlayer: newStartingStatus };
    }
    return player;
  });
}

export { toggleMatchPlayerHelper, toggleStartingPlayerHelper };