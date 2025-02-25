import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { initializeMatchSquadPlayers } from '../utils/matchSquadUtils';
import { Player } from '../../../types/GameTypes';

export default function useMatchSquad() {
  const { selectedSquad, matchSquad, setMatchSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<ExtendedPlayer[]>([]);

  useEffect(() => {
    console.log('selectedSquad in useMatchSquad:', selectedSquad);
    if (selectedSquad) {
      const initialPlayers = initializeMatchSquadPlayers(selectedSquad, matchSquad as ExtendedPlayer[]);
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