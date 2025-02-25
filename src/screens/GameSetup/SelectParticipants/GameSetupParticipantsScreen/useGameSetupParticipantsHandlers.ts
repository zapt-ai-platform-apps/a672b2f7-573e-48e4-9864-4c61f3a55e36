import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/configure');
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return { handleNext, handleBack };
}