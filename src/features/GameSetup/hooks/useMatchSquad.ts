import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { Player } from '../../../types/GameTypes';

interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
}

export default function useMatchSquad() {
  const { selectedSquad, matchSquad, setMatchSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<ExtendedPlayer[]>([]);

  // Initialize matchSquadPlayers from selectedSquad when the component loads
  useEffect(() => {
    console.log('selectedSquad in useMatchSquad:', selectedSquad);
    
    if (selectedSquad && selectedSquad.length > 0) {
      // Check if we already have a matchSquad with isInMatchSquad flags
      if (matchSquad && matchSquad.length > 0 && 'isInMatchSquad' in matchSquad[0]) {
        console.log('Using existing matchSquad with isInMatchSquad flags');
        setMatchSquadPlayers(matchSquad as ExtendedPlayer[]);
      } else {
        // Create new matchSquadPlayers from selectedSquad
        const playersWithMatchFlag = selectedSquad.map(player => ({
          ...player,
          isInMatchSquad: false
        }));
        console.log('Creating new matchSquadPlayers:', playersWithMatchFlag);
        setMatchSquadPlayers(playersWithMatchFlag);
      }
    }
  }, [selectedSquad, matchSquad]);

  const toggleMatchPlayer = (id: string): void => {
    const updatedPlayers = matchSquadPlayers.map(player =>
      player.id === id ? { ...player, isInMatchSquad: !player.isInMatchSquad } : player
    );
    
    setMatchSquadPlayers(updatedPlayers);
    
    // Update matchSquad in the global state with players that have isInMatchSquad = true
    const selectedPlayers = updatedPlayers.filter(player => player.isInMatchSquad);
    console.log('Toggled player. Selected players:', selectedPlayers);
  };

  return {
    matchSquadPlayers,
    toggleMatchPlayer,
  };
}