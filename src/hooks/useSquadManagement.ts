import { useState, useEffect } from 'react';
import { Player, Squad } from '../types/GameTypes';
import * as Sentry from '@sentry/browser';

export function useSquadManagement() {
  const [selectedSquad, setSelectedSquad] = useState<Player[] | Squad>([]);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);

  useEffect(() => {
    console.log('selectedSquad updated in StateProvider:', selectedSquad);
    try {
      if (selectedSquad) {
        if (Array.isArray(selectedSquad)) {
          if (selectedSquad.length > 0) {
            setMatchSquad(selectedSquad);
            console.log('matchSquad updated in StateProvider (array):', selectedSquad);
          }
        } else if (selectedSquad.players && Array.isArray(selectedSquad.players) && selectedSquad.players.length > 0) {
          setMatchSquad(selectedSquad.players);
          console.log('matchSquad updated in StateProvider (object):', selectedSquad.players);
        } else {
          console.warn('Selected squad has no players or invalid format:', selectedSquad);
        }
      }
    } catch (error) {
      console.error('Error processing selected squad:', error);
      Sentry.captureException(error);
    }
  }, [selectedSquad]);

  return { selectedSquad, setSelectedSquad, matchSquad, setMatchSquad };
}

export default useSquadManagement;