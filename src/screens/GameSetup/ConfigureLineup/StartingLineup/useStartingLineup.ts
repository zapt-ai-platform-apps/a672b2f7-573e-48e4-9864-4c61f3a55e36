import { useState, useEffect } from 'react';
import { useStateContext } from 'src/hooks/useStateContext';
import type { Player } from 'src/context/StateContext';

export default function useStartingLineup() {
  const { selectedSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [isGKModalOpen, setIsGKModalOpen] = useState(false);

  useEffect(() => {
    if (selectedSquad && selectedSquad.players) {
      setStartingPlayers(selectedSquad.players);
    }
  }, [selectedSquad]);

  const toggleStartingPlayer = (player: Player) => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === player.id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const setGoalkeeperForPlayer = (id: string | number) => {
    const player = startingPlayers.find(p => p.id === id);
    if (player) {
      setCurrentGoalkeeper(player);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const openGKModal = () => {
    setIsGKModalOpen(true);
  };

  const closeGKModal = () => {
    setIsGKModalOpen(false);
  };

  return {
    startingPlayers,
    toggleStartingPlayer,
    goBack,
    setGoalkeeperForPlayer,
    isGKModalOpen,
    openGKModal,
    closeGKModal,
    currentGoalkeeper
  };
}