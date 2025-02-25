import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from './types';

export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: (players: ExtendedPlayer[]) => void,
  navigate: NavigateFunction,
  setErrorMessage: (message: string) => void
) {
  const handleNext = () => {
    if (selectedMatchPlayers.length < 1) {
      setErrorMessage('Please select at least one player for the match');
      return;
    }

    // This is the critical step - we need to set the selected players in the global state
    // before navigating to the lineup screen
    setSelectedSquad(selectedMatchPlayers);
    
    console.log('Setting matchSquad with players:', selectedMatchPlayers);
    navigate('/setup/starting-lineup');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return { handleNext, handleBack };
}