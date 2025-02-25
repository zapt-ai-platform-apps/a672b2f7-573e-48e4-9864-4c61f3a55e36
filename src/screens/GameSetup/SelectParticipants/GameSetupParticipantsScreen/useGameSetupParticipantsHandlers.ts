import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

export default function useGameSetupParticipantsHandlers(
  selectedPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: (path: string) => void,
  setErrorMessage: (message: string) => void
) {
  function handleNext() {
    if (selectedPlayers.length === 0) {
      setErrorMessage('Please select at least one player.');
      return;
    }
    setErrorMessage('');
    setSelectedSquad(selectedPlayers);
    navigate('/game-setup/next-step');
  }

  function handleBack() {
    navigate('/game-setup/previous-step');
  }

  return { handleNext, handleBack };
}