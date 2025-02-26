import { useCallback } from 'react';
import { ExtendedPlayer } from './ParticipantItem';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (squad: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (msg: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/next');
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);

  const handleBack = useCallback(() => {
    navigate(-1 as unknown as number);
  }, [navigate]);

  return { handleNext, handleBack };
}