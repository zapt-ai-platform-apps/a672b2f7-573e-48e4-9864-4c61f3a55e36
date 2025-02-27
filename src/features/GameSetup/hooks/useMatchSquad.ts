import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { initializeMatchSquadPlayers } from '../utils/matchSquadUtils';
import { Player, Squad } from '../../../types/GameTypes';

/**
 * Type guard to check if an object is a Squad
 */
const isSquad = (obj: unknown): obj is Squad => {
  return Boolean(
    obj && 
    typeof obj === 'object' && 
    obj !== null &&
    'id' in obj && 
    'name' in obj && 
    'players' in obj
  );
};

export default function useMatchSquad() {
  const { selectedSquad, matchSquad, setMatchSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<ExtendedPlayer[]>([]);

  useEffect(() => {
    console.log('selectedSquad in useMatchSquad:', selectedSquad);
    if (!selectedSquad) {
      setMatchSquadPlayers([]);
      return;
    }

    try {
      // Handle different possible types of selectedSquad
      let processedSquad: Squad | Player[] | unknown = selectedSquad;
      
      // Handle case where selectedSquad might be stored as a string
      if (typeof selectedSquad === 'string') {
        try {
          processedSquad = JSON.parse(selectedSquad);
        } catch (e) {
          console.error('Failed to parse selectedSquad as JSON:', e);
          setMatchSquadPlayers([]);
          return;
        }
      }
      
      // Initialize players based on the structure of processedSquad
      let playersToUse: Player[] = [];
      
      if (isSquad(processedSquad)) {
        // It's a Squad object with players property
        playersToUse = processedSquad.players || [];
      } else if (Array.isArray(processedSquad)) {
        // It's an array of players directly
        playersToUse = processedSquad;
      } else if (
        processedSquad && 
        typeof processedSquad === 'object' && 
        'players' in processedSquad && 
        Array.isArray((processedSquad as any).players)
      ) {
        // It has a players property that's an array
        playersToUse = (processedSquad as any).players;
      }
      
      console.log('Players to use:', playersToUse);
      
      if (!playersToUse || playersToUse.length === 0) {
        console.warn('No players found in selected squad');
        setMatchSquadPlayers([]);
        return;
      }
      
      // Create a temporary squad object to pass to initializer
      const squad: Squad = {
        id: 'temp-squad-id',
        name: 'Temporary Squad',
        players: playersToUse
      };
      
      const initialPlayers = initializeMatchSquadPlayers(squad, matchSquad as ExtendedPlayer[]);
      console.log('Initialized match squad players:', initialPlayers);
      setMatchSquadPlayers(initialPlayers);
    } catch (error) {
      console.error('Error processing selectedSquad:', error);
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad, matchSquad]);

  const toggleMatchPlayer = (id: string): void => {
    const updatedPlayers = matchSquadPlayers.map((player: ExtendedPlayer) =>
      player.id === id ? { ...player, isInMatchSquad: !player.isInMatchSquad } : player
    );
    setMatchSquadPlayers(updatedPlayers);
    
    // Convert ExtendedPlayer[] to Player[] before setting matchSquad
    // Fix: Ensure isInStartingLineup property is always included
    const selectedPlayers = updatedPlayers
      .filter((player: ExtendedPlayer) => player.isInMatchSquad)
      .map((player: ExtendedPlayer): Player => ({
        ...player,
        isInMatchSquad: player.isInMatchSquad,
        isInStartingLineup: player.isInStartingLineup || false, // Fix: Ensure this property exists
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