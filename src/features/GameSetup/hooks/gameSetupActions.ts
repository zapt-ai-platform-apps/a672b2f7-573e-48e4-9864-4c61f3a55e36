export function addPlayerAction(
  playerName: string,
  players: any[],
  setPlayers: (players: any[]) => void,
  setPlayerName: (name: string) => void
): boolean {
  if (playerName.trim() !== '') {
    const newPlayer = {
      name: playerName.trim(),
      isStartingPlayer: false
    };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    setPlayerName('');
    return true;
  }
  return false;
}

export function deletePlayerAction(
  playerNameToDelete: string,
  players: any[],
  setPlayers: (players: any[]) => void
): boolean {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${playerNameToDelete}?`);
  if (confirmDelete) {
    const updatedPlayers = players.filter((player) => player.name !== playerNameToDelete);
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    return true;
  }
  return false;
}

export function toggleStartingPlayerAction(
  playerNameToToggle: string,
  players: any[],
  setPlayers: (players: any[]) => void,
  setStartingPlayersCount: (count: number) => void,
  setStartingPlayers: (players: any[]) => void
): void {
  const updatedPlayers = players.map(player =>
    player.name === playerNameToToggle
      ? { ...player, isStartingPlayer: !player.isStartingPlayer }
      : player
  );
  setPlayers(updatedPlayers);
  const count = updatedPlayers.filter(p => p.isStartingPlayer).length;
  setStartingPlayersCount(count);
  setStartingPlayers(updatedPlayers.filter(p => p.isStartingPlayer));
}