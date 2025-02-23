import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../../hooks/useStateContext';
import { Player } from '../../../../../context/StateContext';

interface StartingPlayer extends Player {
  selected: boolean;
}

export default function useStartingLineup() {
  const { selectedSquad } = useStateContext();
  const [startingPlayers, setStartingPlayers] = useState<StartingPlayer[]>([]);
  const [isGKModalOpen, setGKModalOpen] = useState(false);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);

  // Initialize starting players from selected squad
  useEffect(() => {
    if (selectedSquad?.players) {
      const initialPlayers = selectedSquad.players.map(player => ({
        ...player,
        selected: false
      }));
      setStartingPlayers(initialPlayers);
    }
  }, [selectedSquad]);

  const toggleStartingPlayer = (id: string | number) => {
    setStartingPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  const goBack = () => {
    window.history.back();
  };

  const setGoalkeeperForPlayer = (id: string | number) => {
    const player = startingPlayers.find(p => p.id === id);
    if (player) {
      setCurrentGoalkeeper(player);
    }
  };

  const openGKModal = () => setGKModalOpen(true);
  const closeGKModal = () => setGKModalOpen(false);

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