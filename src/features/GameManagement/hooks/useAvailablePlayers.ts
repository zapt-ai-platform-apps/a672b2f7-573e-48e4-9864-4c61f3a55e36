import { useState, useEffect } from 'react';

export function useAvailablePlayers(selectedSquad: any, currentGamePlayers: any[]): string[] {
  const [availablePlayers, setAvailablePlayers] = useState<string[]>([]);

  useEffect(() => {
    if (selectedSquad) {
      let squadPlayers: string[] = [];
      if (Array.isArray(selectedSquad.players)) {
        squadPlayers = selectedSquad.players;
      } else if (selectedSquad.players) {
        squadPlayers = selectedSquad.players.split(',').map((p: string) => p.trim()).filter(Boolean);
      }
      const currentNames = currentGamePlayers ? currentGamePlayers.map((p: any) => p.name) : [];
      const filtered = squadPlayers.filter((name) => !currentNames.includes(name));
      setAvailablePlayers(filtered);
    } else {
      setAvailablePlayers([]);
    }
  }, [selectedSquad, currentGamePlayers]);

  return availablePlayers;
}

export default useAvailablePlayers;