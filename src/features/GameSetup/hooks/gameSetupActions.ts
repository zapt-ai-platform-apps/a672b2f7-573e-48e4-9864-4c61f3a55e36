import { Dispatch, SetStateAction } from 'react';

export function addPlayerAction(
  playerName: string,
  players: any[],
  setPlayers: Dispatch<SetStateAction<any[]>>,
  setPlayerName: Dispatch<SetStateAction<string>>
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
  setPlayers: Dispatch<SetStateAction<any[]>>
): boolean {
  const confirmDelete = window.confirm(`Are you sure you want to delete ${playerNameToDelete}?`);
  if (confirmDelete) {
    const updatedPlayers = players.filter(
      (player) => player.name !== playerNameToDelete
    );
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    return true;
  }
  return false;
}

export function toggleStartingPlayerAction(
  playerNameToToggle: string,
  players: any[],
  setPlayers: Dispatch<SetStateAction<any[]>>,
  setStartingPlayersCount: Dispatch<SetStateAction<number>>,
  setStartingPlayers: Dispatch<SetStateAction<any[]>>
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