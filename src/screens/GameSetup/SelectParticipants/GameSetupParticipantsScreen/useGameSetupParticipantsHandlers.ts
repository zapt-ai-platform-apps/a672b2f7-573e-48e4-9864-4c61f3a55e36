import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from './types';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (squad: ExtendedPlayer[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (msg: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/lineup');
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { handleNext, handleBack };
}