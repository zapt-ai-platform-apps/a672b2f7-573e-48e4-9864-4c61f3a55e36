export function getInitialPlayers(selectedSquad) {
  const storedPlayers = localStorage.getItem('players');
  if (storedPlayers) {
    return JSON.parse(storedPlayers);
  }
  return [];
}