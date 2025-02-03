function getInitialPlayers(selectedSquad) {
  if (selectedSquad) {
    let playersArray = [];
    if (Array.isArray(selectedSquad.players)) {
      playersArray = selectedSquad.players;
    } else if (typeof selectedSquad.players === 'string') {
      playersArray = selectedSquad.players.split(',').map(p => p.trim()).filter(p => p);
    }
    return playersArray.map((p) => ({
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