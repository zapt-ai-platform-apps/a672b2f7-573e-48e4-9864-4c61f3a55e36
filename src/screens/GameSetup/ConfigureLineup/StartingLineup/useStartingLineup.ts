import { useState } from 'react';

interface Player {
  id: string;
  name: string;
  selected: boolean;
}

const initialPlayers: Player[] = [
  { id: '1', name: 'Player One', selected: false },
  { id: '2', name: 'Player Two', selected: false },
  { id: '3', name: 'Player Three', selected: false }
];

export default function useStartingLineup() {
  const [startingPlayers, setStartingPlayers] = useState<Player[]>(initialPlayers);

  const toggleStartingPlayer = (id: string): void => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  return { startingPlayers, toggleStartingPlayer };
}