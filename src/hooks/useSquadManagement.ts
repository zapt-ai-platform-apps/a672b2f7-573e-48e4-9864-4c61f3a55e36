import { useState, useEffect } from 'react';
import { Player, Squad } from '../types/GameTypes';

export function useSquadManagement() {
  const [selectedSquad, setSelectedSquad] = useState<Player[] | Squad>([]);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);

  useEffect(() => {
    console.log('selectedSquad updated in StateProvider:', selectedSquad);
    if (selectedSquad) {
      if (Array.isArray(selectedSquad)) {
        if (selectedSquad.length > 0) {
          setMatchSquad(selectedSquad);
          console.log('matchSquad updated in StateProvider (array):', selectedSquad);
        }
      } else if (selectedSquad.players && selectedSquad.players.length > 0) {
        setMatchSquad(selectedSquad.players);
        console.log('matchSquad updated in StateProvider (object):', selectedSquad.players);
      }
    }
  }, [selectedSquad]);

  return { selectedSquad, setSelectedSquad, matchSquad, setMatchSquad };
}