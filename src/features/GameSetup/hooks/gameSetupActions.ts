import { Player } from '../../../types/GameTypes';

export function addPlayerAction(
  playerName: string,
  players: Player[],
  setPlayers: (players: Player[]) => void,
  setPlayerName: (name: string) => void
): boolean {
  if (playerName.trim() !== '') {
    const newPlayer: Player = {
      id: String(Date.now()), // Convert to string
      name: playerName.trim(),
      playIntervals: [],
      isOnField: false,
      isGoalkeeper: false,
      totalPlayTime: 0,
      position: { x: 0, y: 0 }, // Use 0 instead of null
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
  players: Player[],
  setPlayers: (players: Player[]) => void
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
  players: Player[],
  setPlayers: (players: Player[]) => void,
  setStartingPlayersCount: (count: number) => void,
  setStartingPlayers: (players: Player[]) => void
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