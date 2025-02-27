import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { initializeMatchSquadPlayers } from '../utils/matchSquadUtils';
import { Player, Squad } from '../../../types/GameTypes';

// Type guard to check if an object is a Squad
const isSquad = (obj: any): obj is Squad => {
  return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj && 'players' in obj;
};

export default function useMatchSquad() {
  const { selectedSquad, matchSquad, setMatchSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<ExtendedPlayer[]>([]);

  useEffect(() => {
    console.log('selectedSquad in useMatchSquad:', selectedSquad);
    if (selectedSquad) {
      try {
        // Handle case where selectedSquad might be stored as a string
        let processedSquad = selectedSquad;
        if (typeof selectedSquad === 'string') {
          try {
            processedSquad = JSON.parse(selectedSquad);
          } catch (e) {
            console.error('Failed to parse selectedSquad as JSON:', e);
          }
        }
        
        // Determine if we have a Squad object or an array of Players
        const squad: Squad = isSquad(processedSquad) 
          ? processedSquad 
          : {
              id: 'temp-squad-id',
              name: 'Temporary Squad',
              players: Array.isArray(processedSquad) 
                ? processedSquad 
                : (processedSquad && typeof processedSquad === 'object' && 'players' in processedSquad 
                  ? processedSquad.players 
                  : [])
            };
        
        const initialPlayers = initializeMatchSquadPlayers(squad, matchSquad as ExtendedPlayer[]);
        setMatchSquadPlayers(initialPlayers);
      } catch (error) {
        console.error('Error processing selectedSquad:', error);
        setMatchSquadPlayers([]);
      }
    } else {
      // Ensure we always have an empty array if no squad is selected
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad, matchSquad]);

  const toggleMatchPlayer = (id: string): void => {
    const updatedPlayers = matchSquadPlayers.map((player: ExtendedPlayer) =>
      player.id === id ? { ...player, isInMatchSquad: !player.isInMatchSquad } : player
    );
    setMatchSquadPlayers(updatedPlayers);
    
    // Convert ExtendedPlayer[] to Player[] before setting matchSquad
    const selectedPlayers = updatedPlayers
      .filter((player: ExtendedPlayer) => player.isInMatchSquad)
      .map((player: ExtendedPlayer): Player => ({
        ...player,
        isInMatchSquad: player.isInMatchSquad,
        position: player.position
      }));
    
    setMatchSquad(selectedPlayers);
    console.log('Toggled player. Selected players:', selectedPlayers);
  };

  return {
    matchSquadPlayers,
    toggleMatchPlayer,
  };
}