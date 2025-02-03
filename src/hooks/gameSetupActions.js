function addPlayerAction(playerName, players, setPlayers, setPlayerName) {
  if (playerName.trim() !== '') {
    const newPlayer = {
      name: playerName.trim(),
      isStartingPlayer: false
    };
    setPlayers([...players, newPlayer]);
    setPlayerName('');
    return true;
  }
  return false;
}

function deletePlayerAction(playerNameToDelete, players, setPlayers) {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${playerNameToDelete}?`
  );
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

function toggleStartingPlayerAction(
  playerNameToToggle,
  players,
  setPlayers,
  setStartingPlayersCount,
  setStartingPlayers
) {
  const updatedPlayers = players.map((player) => {
    if (player.name === playerNameToToggle) {
      return { ...player, isStartingPlayer: !player.isStartingPlayer };
    }
    return player;
  });
  setPlayers(updatedPlayers);
  const count = updatedPlayers.filter((p) => p.isStartingPlayer).length;
  setStartingPlayersCount(count);
  setStartingPlayers(updatedPlayers.filter((p) => p.isStartingPlayer));
}

export { addPlayerAction, deletePlayerAction, toggleStartingPlayerAction };