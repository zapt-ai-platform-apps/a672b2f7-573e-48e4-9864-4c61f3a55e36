import { ExtendedPlayer } from './types';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (message: string) => void
) {
  function handleNext() {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage("Please select at least one participant.");
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate("/game-setup/next-screen");
  }

  function handleBack() {
    navigate(-1);
  }

  return { handleNext, handleBack };
}