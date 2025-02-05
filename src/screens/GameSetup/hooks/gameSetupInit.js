export function getInitialPlayers(selectedSquad) {
  if (selectedSquad && selectedSquad.players) {
    const squadPlayers = Array.isArray(selectedSquad.players)
      ? selectedSquad.players
      : selectedSquad.players.split(',').map(p => p.trim()).filter(Boolean);
    return squadPlayers.map(name => ({ name, isStartingPlayer: false }));
  }
  const storedPlayers = localStorage.getItem('players');
  if (storedPlayers) {
    try {
      return JSON.parse(storedPlayers);
    } catch {
      return [];
    }
  }
  return [];
}