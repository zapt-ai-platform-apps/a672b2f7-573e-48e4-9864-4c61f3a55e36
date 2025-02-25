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
      // If selectedSquad is a Squad, use it directly, otherwise create a temporary Squad object
      const squad: Squad = isSquad(selectedSquad) 
        ? selectedSquad 
        : {
            id: 'temp-squad-id',
            name: 'Temporary Squad',
            players: selectedSquad as Player[]
          };
          
      const initialPlayers = initializeMatchSquadPlayers(squad, matchSquad as ExtendedPlayer[]);
      setMatchSquadPlayers(initialPlayers);
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