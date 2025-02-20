import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface Squad {
  players?: string[] | { name: string }[];
}

export default function useSquadSetup(currentSquad: Squad | null, setPlayerData: Dispatch<SetStateAction<any[]>>): void {
  useEffect(() => {
    if (currentSquad?.players) {
      const squadPlayers = currentSquad.players.map(player => ({
        name: typeof player === 'string' ? player : player.name,
        isStartingPlayer: true,
        isInMatchSquad: true,
        playIntervals: []
      }));
      setPlayerData(prev => [
        ...prev.filter(p => p.isInMatchSquad),
        ...squadPlayers
      ]);
    }
  }, [currentSquad, setPlayerData]);
}