import { useCallback } from 'react';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: Array<{ id: string }>,
  setSelectedSquad: (squad: Array<{ id: string }>) => void,
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
    navigate(-1);
  }, [navigate]);

  return { handleNext, handleBack };
}