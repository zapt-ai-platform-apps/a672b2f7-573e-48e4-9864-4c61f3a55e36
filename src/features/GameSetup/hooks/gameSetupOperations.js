export function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (playerName.trim() !== '') {
    setStartingPlayers(prev => {
      const newPlayer = {
        id: prev.length + 1,
        name: playerName.trim(),
        isStartingPlayer: true
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}

export function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
}

export function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev =>
    prev.map(player =>
      player.id === playerId
        ? { ...player, isStartingPlayer: !player.isStartingPlayer }
        : player
    )
  );
}

export function handleStartGameWrapper(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame) {
  if (!goalkeeper) {
    setErrorMessage('Please select a goalkeeper');
    return;
  }
  const playersToStart = startingPlayers.filter(player => player.isStartingPlayer);
  if (playersToStart.length === 0) {
    setErrorMessage('At least one player must be selected as starter');
    return;
  }
  contextHandleStartGame(playersToStart, goalkeeper, includeGKPlaytime);
}