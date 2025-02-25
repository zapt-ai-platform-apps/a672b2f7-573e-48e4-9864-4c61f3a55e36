import { useCallback } from 'react';
import { ExtendedPlayer } from './ParticipantItem';

function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (msg: string) => void
) {
  const handleNext = useCallback(() => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage("Please select at least one participant.");
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate("/gamesetup/config");
  }, [selectedMatchPlayers, setSelectedSquad, navigate, setErrorMessage]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { handleNext, handleBack };
}

export default useGameSetupParticipantsHandlers;