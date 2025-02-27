import { useState, useEffect } from 'react';
import { Player } from '../../../../types/GameTypes';
import { useStateContext } from '../../../../hooks/useStateContext';

/**
 * Hook to manage starting lineup state and operations
 */
export default function useStartingLineup() {
  const { matchSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (matchSquad && matchSquad.length > 0) {
      // Initialize starting players from match squad
      setStartingPlayers(
        matchSquad.map(player => ({
          ...player,
          isStartingPlayer: false
        }))
      );
    }
  }, [matchSquad]);

  /**
   * Toggle a player's starting status
   */
  const toggleStartingPlayer = (playerId: string) => {
    // Update the starting players list
    setStartingPlayers(prev => 
      prev.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            isStartingPlayer: !player.isStartingPlayer
          };
        }
        return player;
      })
    );

    // Update the selected players list
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      } else {
        return [...prev, playerId];
      }
    });
  };

  return {
    startingPlayers,
    selectedPlayers,
    toggleStartingPlayer
  };
}