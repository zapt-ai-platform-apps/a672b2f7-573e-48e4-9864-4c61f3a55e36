import { useCallback } from 'react';

export interface ExtendedPlayer {
  id: string;
  isInMatchSquad?: boolean;
  name?: string;
}

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (squad: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (msg: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/details');
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { handleNext, handleBack };
}