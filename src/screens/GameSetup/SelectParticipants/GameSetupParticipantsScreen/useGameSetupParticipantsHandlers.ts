import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from './types';

type SetSelectedSquad = (players: ExtendedPlayer[]) => void;
type SetErrorMessage = (message: string) => void;

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: SetSelectedSquad,
  navigate: NavigateFunction,
  setErrorMessage: SetErrorMessage
) {
  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setErrorMessage('');
    setSelectedSquad(selectedMatchPlayers);
    navigate('/game-setup/next-step');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
}