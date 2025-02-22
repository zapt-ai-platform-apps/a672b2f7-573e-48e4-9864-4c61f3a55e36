import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../../state';
import { parsePlayers } from '../../../../utils/parsePlayers';
import type { Player } from '../../../context/StateContext';

function useStartingLineup() {
  const { selectedSquad, matchSquad, setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    let playersData: Player[] = [];
    const hasSelectedPlayers =
      selectedSquad &&
      selectedSquad.players &&
      ((typeof selectedSquad.players === 'string' && parsePlayers(selectedSquad.players).length > 0) ||
        (Array.isArray(selectedSquad.players) && selectedSquad.players.length > 0));

    if (hasSelectedPlayers) {
      playersData =
        typeof selectedSquad.players === 'string'
          ? (parsePlayers(selectedSquad.players) as Player[])
          : selectedSquad.players;
    } else if (matchSquad && matchSquad.length > 0) {
      playersData = matchSquad;
    } else {
      navigate('/setup/participants');
      return;
    }

    setStartingPlayers(playersData);
  }, [selectedSquad, matchSquad, navigate]);

  const toggleStartingPlayer = (playerId: string | number): void => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  const handleContinue = (): void => {
    if (!selectedSquad) return;
    const updatedSquad = {
      ...selectedSquad,
      players: startingPlayers,
    };
    setSelectedSquad(updatedSquad);
    navigate('/setup/configuration');
  };

  const goBack = (): void => {
    navigate('/setup/participants');
  };

  return { startingPlayers, toggleStartingPlayer, handleContinue, goBack };
}

export default useStartingLineup;