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
      let squadPlayers = [];
      if (selectedSquad.players) {
        if (Array.isArray(selectedSquad.players)) {
          squadPlayers = selectedSquad.players;
        } else if (typeof selectedSquad.players === 'string') {
          try {
            squadPlayers = JSON.parse(selectedSquad.players);
            if (!Array.isArray(squadPlayers)) {
              throw new Error('Parsed squad players is not an array');
            }
          } catch (error) {
            console.error('Error parsing squad players JSON, falling back to CSV:', error);
            squadPlayers = selectedSquad.players.split(',').map(s => s.trim()).filter(Boolean);
          }
        }
      }
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