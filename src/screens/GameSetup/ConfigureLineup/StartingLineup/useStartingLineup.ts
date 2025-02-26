import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../hooks/useStateContext';
import { Player } from '../../../../types/GameTypes';

interface StartingLineupHook {
  startingPlayers: Player[];
  selectedPlayers: Player[];
  toggleStartingPlayer: (id: string) => void;
  clearSelectedPlayers: () => void;
}

export default function useStartingLineup(): StartingLineupHook {
  const { matchSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (matchSquad && matchSquad.length > 0) {
      console.log("Setting starting players from matchSquad:", matchSquad);
      // Initialize with existing selection state if available
      setStartingPlayers(matchSquad.map((player: any) => ({
        ...player,
        selected: player.selected || false
      })));
    }
  }, [matchSquad]);

  const toggleStartingPlayer = (id: string): void => {
    console.log(`Toggling player with id: ${id}`);
    setStartingPlayers(prev =>
      prev.map(player => 
        player.id === id 
          ? { ...player, selected: !player.selected } 
          : player
      )
    );
  };

  const clearSelectedPlayers = (): void => {
    setStartingPlayers(prev =>
      prev.map(player => ({ ...player, selected: false }))
    );
  };

  // Derived state for selected players
  const selectedPlayers = startingPlayers.filter(player => player.selected);

  return { 
    startingPlayers, 
    selectedPlayers, 
    toggleStartingPlayer, 
    clearSelectedPlayers 
  };
}