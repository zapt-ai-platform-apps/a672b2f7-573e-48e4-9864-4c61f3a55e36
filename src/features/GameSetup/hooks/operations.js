function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (!playerName) return;
  const newPlayer = { id: Date.now().toString(), name: playerName, isStarting: false };
  setStartingPlayers(prev => [...prev, newPlayer]);
  setPlayerName('');
}

function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
}

function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev =>
    prev.map(player => player.id === playerId ? { ...player, isStarting: !player.isStarting } : player)
  );
}

function handleStartGameWrapper(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame) {
  if (!goalkeeper) {
    setErrorMessage("Please select a goalkeeper.");
    return;
  }
  if (startingPlayers.length < 1) {
    setErrorMessage("Not enough players.");
    return;
  }
  setErrorMessage('');
  contextHandleStartGame({ goalkeeper, startingPlayers, includeGKPlaytime });
}

export { addPlayer, deletePlayer, toggleStartingPlayer, handleStartGameWrapper };