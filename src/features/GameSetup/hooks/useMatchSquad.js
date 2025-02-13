import React, { useState } from 'react';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([
    { id: '1', name: 'Player 1', isInMatch: false, isStartingPlayer: false },
    { id: '2', name: 'Player 2', isInMatch: false, isStartingPlayer: false },
    { id: '3', name: 'Player 3', isInMatch: false, isStartingPlayer: false }
  ]);

  const toggleMatchPlayer = (id) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  };

  const toggleStartingPlayer = (id) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
      )
    );
  };

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;