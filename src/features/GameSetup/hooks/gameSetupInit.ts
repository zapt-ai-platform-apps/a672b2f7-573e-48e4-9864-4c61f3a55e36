export function getInitialPlayers(selectedSquad: { players: any[] }): string[] {
  return selectedSquad.players.map(player => 
    typeof player === 'string' ? player : player?.name || ''
  ).filter(Boolean);
}