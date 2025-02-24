import { useCallback } from 'react';
import { ExtendedPlayer } from './types';
import type { Squad } from '../../../components/StateProvider';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (updater: Squad | null | ((prev: Squad | null) => Squad)) => void,
  navigate: (path: string) => void,
  setErrorMessage: (msg: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match.');
      return;
    }
    
    const playersWithIds = selectedMatchPlayers.map((player: ExtendedPlayer, index: number) => ({
      id: player.id ? player.id : index + 1,
      name:
        typeof player.name === 'object'
          ? ((player.name as { name: string }).name || JSON.stringify(player.name))
          : player.name,
      isStartingPlayer: true
    }));
    
    setSelectedSquad((prev) => ({
      id: prev?.id ?? '',
      name: prev?.name ?? '',
      players: playersWithIds
    }));
    
    navigate('/setup/starting-lineup');
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);
  
  const handleBack = useCallback(() => {
    navigate('/squads');
  }, [navigate]);
  
  return { handleNext, handleBack };
}