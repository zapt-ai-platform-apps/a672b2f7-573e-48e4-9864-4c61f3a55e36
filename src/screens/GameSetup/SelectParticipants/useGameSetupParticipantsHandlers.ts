import { SetStateAction, Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from './ParticipantItem';

// Import the Squad type from the correct location
import { Squad } from '../../../types/GameTypes';

/**
 * Custom hook for handling participant selection navigation and validation
 */
export default function useGameSetupParticipantsHandlers(
  selectedMatchPlayers: ExtendedPlayer[],
  setSelectedSquad: Dispatch<SetStateAction<Squad | null>>,
  navigate: NavigateFunction,
  setErrorMessage: (value: SetStateAction<string>) => void
) {
  /**
   * Navigate to the next step if there are enough players selected
   */
  const handleNext = () => {
    if (selectedMatchPlayers.length < 1) {
      setErrorMessage('Please select at least one player to continue.');
      return;
    }
    
    // Store selected players in state, constructing a proper Squad object
    const selectedPlayers = selectedMatchPlayers.map(player => ({
      id: player.id,
      name: player.name,
      isInMatchSquad: true
    }));
    
    setSelectedSquad((prevState: Squad | null) => ({
      // Ensure we have the required Squad properties
      id: prevState?.id || `temp-${Date.now()}`,
      name: prevState?.name || 'Match Squad',
      // Include the selected players
      players: selectedPlayers
    }));
    
    // Navigate to next step (starting lineup)
    navigate('/setup/starting-lineup');
  };

  /**
   * Navigate back to the squad selection page
   */
  const handleBack = () => {
    navigate('/squads');
  };

  return {
    handleNext,
    handleBack
  };
}