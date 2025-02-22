import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../state';
import { Player } from '../../../../types/GameTypes';

export default function useStartingLineup() {
  const { selectedSquad } = useStateContext();
  const [lineupPlayers, setLineupPlayers] = useState<Player[]>(selectedSquad ? [...selectedSquad.players] : []);
  const [currentGoalkeeper, setCurrentGoalkeeper] = useState<Player | null>(null);
  const [isGKModalOpen, setGKModalOpen] = useState(false);

  useEffect(() => {
    if (selectedSquad) {
      // Initialize local lineup state when selected squad changes
      setLineupPlayers([...selectedSquad.players]);
      setCurrentGoalkeeper(null);
    }
  }, [selectedSquad]);

  const toggleStartingPlayer = (player: Player) => {
    setLineupPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === player.id ? { ...p, isStartingPlayer: !p.isStartingPlayer } : p
      )
    );
  };

  const handleContinue = () => {
    console.log('Continue to configuration with players:', lineupPlayers);
  };

  const goBack = () => {
    console.log('Going back');
  };

  const setGoalkeeperForPlayer = (playerId: number) => {
    const player = lineupPlayers.find(p => p.id === playerId) || null;
    setCurrentGoalkeeper(player);
  };

  const openGKModal = () => {
    setGKModalOpen(true);
  };

  const closeGKModal = () => {
    setGKModalOpen(false);
  };

  return {
    startingPlayers: lineupPlayers,
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