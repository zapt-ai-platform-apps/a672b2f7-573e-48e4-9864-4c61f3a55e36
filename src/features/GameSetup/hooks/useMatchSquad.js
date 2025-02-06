import { useState } from 'react';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([
    { id: 1, name: 'Player 1', isInMatch: false, isStartingPlayer: false },
    { id: 2, name: 'Player 2', isInMatch: false, isStartingPlayer: false },
    { id: 3, name: 'Player 3', isInMatch: false, isStartingPlayer: false }
  ]);

  const toggleMatchPlayer = (playerId) => {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId
          ? { ...player, isInMatch: !player.isInMatch }
          : player
      )
    );
  };

  return { matchSquadPlayers, toggleMatchPlayer };
}

export default useMatchSquad;