import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../state';

export default function useMatchSquad() {
  const { selectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);

  useEffect(() => {
    if (!selectedSquad) {
      navigate('/squads', { replace: true });
    } else {
      const squadPlayers = Array.isArray(selectedSquad.players) 
        ? selectedSquad.players 
        : selectedSquad.players.split(',').map(p => p.trim());
      const initialMatchPlayers = squadPlayers.map(name => ({ 
        name, 
        isStartingPlayer: false 
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

  const activeMatchPlayers = matchSquadPlayers.filter(player => player.isInMatch !== false);

  return { matchSquadPlayers, activeMatchPlayers, toggleMatchPlayer };
}