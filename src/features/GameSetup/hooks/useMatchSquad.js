import { useState } from 'react';

const initialPlayers = [
  { id: 1, name: 'Player 1', isInMatch: true, isStartingPlayer: false },
  { id: 2, name: 'Player 2', isInMatch: true, isStartingPlayer: false },
  { id: 3, name: 'Player 3', isInMatch: true, isStartingPlayer: true }
];

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState(initialPlayers);

  const toggleStartingPlayer = (playerId) => {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  return { matchSquadPlayers, toggleStartingPlayer };
}

export default useMatchSquad;