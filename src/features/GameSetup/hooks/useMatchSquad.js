import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state.jsx';
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
      const squadPlayers = initialPlayers.map(player => player.name);
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
        player.name === playerName
          ? { ...player, isInMatch: !player.isInMatch }
          : player
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