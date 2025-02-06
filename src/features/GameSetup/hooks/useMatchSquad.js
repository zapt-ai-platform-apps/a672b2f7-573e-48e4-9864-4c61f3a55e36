import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state';
import { getInitialPlayers } from './gameSetupInit.js';

export default function useMatchSquad() {
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);

  useEffect(() => {
    if (!selectedSquad) {
      navigate('/squads', { replace: true });
    } else {
      const initialPlayers = getInitialPlayers(selectedSquad);
      // Ensure that if players are stored as objects, extract their name; otherwise use the value directly.
      const squadPlayers = initialPlayers.map(player =>
        typeof player === 'object' && player.name ? player.name : player
      );
      // Reinitialize the match squad list with the actual names from the selected squad.
      const initialMatchPlayers = squadPlayers.map(name => ({
        name,
        isStartingPlayer: false,
        isInMatch: true
      }));
      setMatchSquadPlayers(initialMatchPlayers);
    }
  }, [selectedSquad, navigate]);

  const toggleMatchPlayer = (playerName) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.name === playerName ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  };

  const toggleStartingPlayer = (playerName) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.name === playerName && player.isInMatch
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  const activeMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch);

  return { matchSquadPlayers, activeMatchPlayers, toggleMatchPlayer, toggleStartingPlayer };
}