import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: number | string;
  name: string;
  selected?: boolean;
}

export default function useStartingLineup() {
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([
    { id: 1, name: 'John Doe', selected: false },
    { id: 2, name: 'Jane Smith', selected: false },
    { id: 3, name: 'Alice Johnson', selected: false }
  ]);
  const [isGKModalOpen, setIsGKModalOpen] = useState<boolean>(false);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const navigate = useNavigate();

  const toggleStartingPlayer = (id: number | string) => {
    setStartingPlayers(prev =>
      prev.map(player => player.id === id ? { ...player, selected: !player.selected } : player)
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
    currentGoalkeeper
  };
}