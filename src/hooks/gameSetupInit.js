function getInitialPlayers(selectedSquad) {
  if (selectedSquad && Array.isArray(selectedSquad.players)) {
    return selectedSquad.players.map((p) => ({
      name: p,
      isStartingPlayer: false
    }));
  } else {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      const loadedPlayers = JSON.parse(savedPlayers);
      return loadedPlayers.map((player) => ({
        ...player,
        isStartingPlayer: false
      }));
    }
  }
  return [];
}

export { getInitialPlayers };