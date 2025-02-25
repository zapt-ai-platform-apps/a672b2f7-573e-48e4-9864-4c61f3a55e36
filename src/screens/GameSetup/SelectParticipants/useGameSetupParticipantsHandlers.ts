import { ExtendedPlayer } from './types';
import { NavigateFunction } from 'react-router-dom';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string) => void
) {
  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('No players selected.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/roles');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
}