import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../../state';
import { parsePlayers } from '../../../../utils/parsePlayers';
import type { Player } from '../../../context/StateContext';

function useStartingLineup() {
  const { selectedSquad, setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (selectedSquad && selectedSquad.players) {
      let playersData: Player[] = [];
      if (typeof selectedSquad.players === 'string') {
        playersData = parsePlayers(selectedSquad.players) as Player[];
      } else if (Array.isArray(selectedSquad.players)) {
        playersData = selectedSquad.players;
      }
      setStartingPlayers(playersData);
    } else {
      navigate('/setup/participants');
    }
  }, [selectedSquad, navigate]);

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