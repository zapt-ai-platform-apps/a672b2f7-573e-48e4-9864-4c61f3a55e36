import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { initializeMatchSquadPlayers } from '../utils/matchSquadUtils';

export default function useMatchSquad() {
  const { selectedSquad, matchSquad, setMatchSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<ExtendedPlayer[]>([]);

  useEffect(() => {
    console.log('selectedSquad in useMatchSquad:', selectedSquad);
    if (selectedSquad) {
      const initialPlayers = initializeMatchSquadPlayers(selectedSquad, matchSquad);
      setMatchSquadPlayers(initialPlayers);
    }
  }, [selectedSquad, matchSquad]);

  const toggleMatchPlayer = (id: string): void => {
    const updatedPlayers = matchSquadPlayers.map((player: ExtendedPlayer) =>
      player.id === id ? { ...player, isInMatchSquad: !player.isInMatchSquad } : player
    );
    setMatchSquadPlayers(updatedPlayers);
    const selectedPlayers = updatedPlayers.filter((player: ExtendedPlayer) => player.isInMatchSquad);
    setMatchSquad(selectedPlayers);
    console.log('Toggled player. Selected players:', selectedPlayers);
  };

  return {
    matchSquadPlayers,
    toggleMatchPlayer,
  };
}