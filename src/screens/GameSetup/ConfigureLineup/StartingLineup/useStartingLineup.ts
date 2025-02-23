import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../../hooks/useStateContext';
import { Player as GamePlayer } from '../../../../types/GameTypes';

interface LineupPlayer extends GamePlayer {
  selected?: boolean;
}

export default function useStartingLineup() {
  const { matchSquad, selectedSquad } = useStateContext();

  const [startingPlayers, setStartingPlayers] = useState<LineupPlayer[]>([]);
  const [isGKModalOpen, setIsGKModalOpen] = useState<boolean>(false);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<LineupPlayer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const players = matchSquad.length > 0 ? matchSquad : (selectedSquad?.players || []);
    setStartingPlayers(
      players.map(player => ({
        ...player,
        selected: player.isStartingPlayer || false,
      }))
    );
  }, [matchSquad, selectedSquad]);

  const toggleStartingPlayer = (id: number | string) => {
    setStartingPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const setGoalkeeperForPlayer = (id: number | string) => {
    const player = startingPlayers.find(p => p.id === id);
    if (player) {
      setCurrentGoalkeeper(player);
    }
  };

  const openGKModal = () => setIsGKModalOpen(true);
  const closeGKModal = () => setIsGKModalOpen(false);

  return {
    startingPlayers,
    toggleStartingPlayer,
    goBack,
    setGoalkeeperForPlayer,
    isGKModalOpen,
    openGKModal,
    closeGKModal,
    currentGoalkeeper,
  };
}