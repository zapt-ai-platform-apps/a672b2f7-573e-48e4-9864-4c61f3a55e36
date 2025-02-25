import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../hooks/useStateContext';

type Player = {
  id: string;
  selected: boolean;
  [key: string]: any;
};

export default function useStartingLineup(): { startingPlayers: Player[], toggleStartingPlayer: (id: string) => void } {
  const { matchSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (matchSquad && matchSquad.length > 0 && startingPlayers.length === 0) {
      setStartingPlayers(matchSquad.map((player: any) => ({ ...player, selected: false })));
    }
  }, [matchSquad, startingPlayers.length]);

  const toggleStartingPlayer = (id: string): void => {
    setStartingPlayers(prev =>
      prev.map(player => player.id === id ? { ...player, selected: !player.selected } : player)
    );
  };

  return { startingPlayers, toggleStartingPlayer };
}