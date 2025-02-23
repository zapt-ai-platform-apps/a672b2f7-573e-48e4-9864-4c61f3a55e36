import { useState } from 'react';

type Player = {
  id: number;
  name: string;
  selected?: boolean;
};

export default function useStartingLineup() {
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1", selected: false },
    { id: 2, name: "Player 2", selected: false },
    { id: 3, name: "Player 3", selected: false }
  ]);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [isGKModalOpen, setIsGKModalOpen] = useState(false);

  const toggleStartingPlayer = (player: Player) => {
    setStartingPlayers(prev =>
      prev.map(p =>
        p.id === player.id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const goBack = () => {
    window.history.back();
  };

  const setGoalkeeperForPlayer = (playerId: number) => {
    const player = startingPlayers.find(p => p.id === playerId);
    if (player) {
      setCurrentGoalkeeper(player);
    }
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