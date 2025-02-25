import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from '../../../features/GameSetup/types/ExtendedPlayer';
import { Squad } from '../../../types/GameTypes';

export default function useGameSetupParticipantsHandlers(
  selectedPlayers: ExtendedPlayer[],
  setSelectedSquad: (squad: Squad) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string) => void
) {
  const handleNext = () => {
    if (selectedPlayers.length === 0) {
      setErrorMessage('Please select at least one player for the match');
      return;
    }
    navigate('/game-setup/step-two');
  };

  const handleBack = () => {
    navigate('/');
  };

  return {
    handleNext,
    handleBack,
  };
}