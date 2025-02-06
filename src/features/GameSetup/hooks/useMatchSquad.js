import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { parsePlayers } from '../../../lib/utils';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();
  // Initialize with an empty array; will be populated with real squad players if available.
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);

  useEffect(() => {
    if (selectedSquad && selectedSquad.players) {
      // Parse the players from the selected squad.
      const playersArray = Array.isArray(selectedSquad.players)
        ? selectedSquad.players
        : parsePlayers(selectedSquad.players);
      // Build player objects from the real squad data.
      const initialPlayers = playersArray.map((name, index) => ({
        id: index,
        name,
        isInMatch: false,
        isStartingPlayer: false,
      }));
      setMatchSquadPlayers(initialPlayers);
    } else {
      // Ensure no dummy players are used if no squad is selected.
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad]);

  const toggleMatchPlayer = (playerId) => {
    setMatchSquadPlayers((players) =>
      players.map((player) =>
        player.id === playerId ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  };

  return { matchSquadPlayers, toggleMatchPlayer };
}

export default useMatchSquad;