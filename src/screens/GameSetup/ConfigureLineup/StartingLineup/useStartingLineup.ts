import { useState } from 'react';

type Player = {
  id: number;
  name: string;
};

export default function useStartingLineup() {
  const [startingPlayers, setStartingPlayers] = useState<Player[]>([
    { id: 1, name: 'Player One' },
    { id: 2, name: 'Player Two' },
    { id: 3, name: 'Player Three' }
  ]);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [isGKModalOpen, setGKModalOpen] = useState(false);

  const toggleStartingPlayer = (player: Player) => {
    console.log(`Toggled player with id ${player.id}`);
  };

  const handleContinue = () => {
    console.log('Continue to configuration with players:', startingPlayers);
  };

  const goBack = () => {
    console.log('Going back');
  };

  const setGoalkeeperForPlayer = (playerId: number) => {
    const player = startingPlayers.find(p => p.id === playerId) || null;
    setCurrentGoalkeeper(player);
  };

  const openGKModal = () => {
    setGKModalOpen(true);
  };

  const closeGKModal = () => {
    setGKModalOpen(false);
  };

  return {
    startingPlayers,
    toggleStartingPlayer,
    handleContinue,
    goBack,
    setGoalkeeperForPlayer,
    isGKModalOpen,
    openGKModal,
    closeGKModal,
    currentGoalkeeper
  };
}