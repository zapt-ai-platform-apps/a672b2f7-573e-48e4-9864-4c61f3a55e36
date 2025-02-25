import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from '../../../features/GameSetup/types/ExtendedPlayer';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string) => void
) {
  function handleNext() {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage("Please select at least one participant.");
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate("/setup/participants");
  }

  function handleBack() {
    navigate(-1);
  }

  return { handleNext, handleBack };
}