import { useState } from 'react';

export interface Player {
  id: number;
  name: string;
  selected?: boolean;
}

export default function useStartingLineup() {
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([
    { id: 1, name: 'Player One' },
    { id: 2, name: 'Player Two' },
    { id: 3, name: 'Player Three' }
  ]);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [isGKModalOpen, setIsGKModalOpen] = useState(false);

  const toggleStartingPlayer = (player: Player) => {
    setStartingPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === player.id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const setGoalkeeperForPlayer = (id: number) => {
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