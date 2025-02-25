import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../hooks/useStateContext';
import { Player } from '../../../../types/GameTypes';

interface StartingPlayer extends Player {
  selected: boolean;
}

export default function useStartingLineup() {
  const { matchSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<StartingPlayer[]>([]);

  // Initialize players from matchSquad when the component loads
  useEffect(() => {
    if (matchSquad && matchSquad.length > 0) {
      // Map the players from matchSquad to include the 'selected' property
      const playersWithSelectionState = matchSquad.map(player => ({
        ...player,
        selected: false
      }));
      setStartingPlayers(playersWithSelectionState);
    }
  }, [matchSquad]);

  const toggleStartingPlayer = (id: string): void => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  return { startingPlayers, toggleStartingPlayer };
}