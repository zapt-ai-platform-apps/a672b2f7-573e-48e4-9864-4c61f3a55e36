import { NavigateFunction } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { Squad } from '../../../types/GameTypes';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: any[],
  setSelectedSquad: Dispatch<SetStateAction<Squad | null>>,
  navigate: NavigateFunction,
  setErrorMessage: (msg: string) => void
) {
  function handleNext() {
    if (selectedMatchPlayers.length === 0) {
      setErrorMessage('Please select at least one participant.');
      return;
    }
    setErrorMessage('');
    // Create a squad object instead of directly passing players array
    setSelectedSquad({ 
      id: 'temp-id', 
      name: 'Match Squad', 
      players: selectedMatchPlayers 
    });
    navigate('/game-setup/config');
  }

  function handleBack() {
    navigate(-1);
  }

  return {
    handleNext,
    handleBack,
  };
}