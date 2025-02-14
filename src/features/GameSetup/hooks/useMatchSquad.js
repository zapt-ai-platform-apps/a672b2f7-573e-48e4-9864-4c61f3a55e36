import { useState } from 'react';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([
    { id: 1, name: 'Player 1', isInMatch: true, isStartingPlayer: false },
    { id: 2, name: 'Player 2', isInMatch: true, isStartingPlayer: false },
    { id: 3, name: 'Player 3', isInMatch: false, isStartingPlayer: false }
  ]);

  function toggleMatchPlayer(playerId) {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  }

  function toggleStartingPlayer(playerId) {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
      )
    );
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;