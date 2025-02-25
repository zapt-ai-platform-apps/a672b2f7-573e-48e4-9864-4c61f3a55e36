import { ExtendedPlayer } from './types';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: Dispatch<SetStateAction<ExtendedPlayer[]>>,
  navigate: NavigateFunction,
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  const handleNext = () => {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one player.');
      return;
    }
    setSelectedSquad(selectedMatchPlayers);
    navigate('/next-setup');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
}