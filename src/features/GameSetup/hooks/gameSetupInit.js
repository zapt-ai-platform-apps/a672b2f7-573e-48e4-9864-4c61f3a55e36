export function getInitialPlayers(selectedSquad) {
  return selectedSquad.players.map(player => 
    typeof player === 'string' ? player : player?.name || ''
  ).filter(Boolean);
}