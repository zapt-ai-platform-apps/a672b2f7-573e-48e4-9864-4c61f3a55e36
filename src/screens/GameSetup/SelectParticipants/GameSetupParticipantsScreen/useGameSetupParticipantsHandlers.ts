import { ExtendedPlayer } from './types';

export default function useGameSetupParticipantsHandlers(
  selectedPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: (path: string | number) => void,
  setErrorMessage: (message: string) => void
) {
  const handleNext = () => {
    if (selectedPlayers.length === 0) {
      setErrorMessage('No players selected!');
      return;
    }
    setSelectedSquad(selectedPlayers);
    navigate('/nextStep');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
}