import { useState } from 'react';

interface Player {
  id: number;
  name: string;
  selected: boolean;
}

export default function useStartingLineup() {
  const initialPlayers: Player[] = [
    { id: 1, name: "Player 1", selected: false },
    { id: 2, name: "Player 2", selected: false },
    { id: 3, name: "Player 3", selected: false }
  ];
  const [startingPlayers, setStartingPlayers] = useState<Player[]>(initialPlayers);
  const [isGKModalOpen, setGKModalOpen] = useState(false);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);

  const toggleStartingPlayer = (id: number) => {
    setStartingPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, selected: !player.selected } : player
      )
    );
  };

  const goBack = () => {
    window.history.back();
  };

  const setGoalkeeperForPlayer = (id: number) => {
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