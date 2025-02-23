import { useState, useEffect } from 'react';
import { useStateContext } from '../../../../hooks/useStateContext';
import { Player } from '../../../../context/StateContext';

export default function useStartingLineup() {
  const { matchSquad, setMatchSquad, selectedSquad, goalkeeper, setGoalkeeper } = useStateContext();
  const [isGKModalOpen, setIsGKModalOpen] = useState<boolean>(false);

  // If matchSquad is empty and selectedSquad has players, update matchSquad from selectedSquad
  useEffect(() => {
    if (
      matchSquad.length === 0 &&
      selectedSquad &&
      Array.isArray(selectedSquad.players) &&
      selectedSquad.players.length > 0
    ) {
      setMatchSquad(selectedSquad.players);
    }
  }, [matchSquad, selectedSquad, setMatchSquad]);

  const toggleStartingPlayer = (player: Player): void => {
    const updatedSquad = matchSquad.map((p) =>
      p.id === player.id ? { ...p, isStartingPlayer: !p.isStartingPlayer } : p
    );
    setMatchSquad(updatedSquad);
  };

  const goBack = (): void => {
    window.history.back();
  };

  const setGoalkeeperForPlayer = (playerId: number): void => {
    const player = matchSquad.find((p) => p.id === playerId);
    if (player) {
      setGoalkeeper(player);
    }
  };

  const openGKModal = (): void => {
    setIsGKModalOpen(true);
  };

  const closeGKModal = (): void => {
    setIsGKModalOpen(false);
  };

  return {
    startingPlayers: matchSquad,
    toggleStartingPlayer,
    goBack,
    setGoalkeeperForPlayer,
    isGKModalOpen,
    openGKModal,
    closeGKModal,
    currentGoalkeeper: goalkeeper,
  };
}