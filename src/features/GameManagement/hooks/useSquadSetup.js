import { useEffect } from 'react';

export default function useSquadSetup(currentSquad, setPlayerData) {
  useEffect(() => {
    if (currentSquad?.players) {
      const squadPlayers = currentSquad.players.map(name => ({
        name,
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