import { SetStateAction, Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ExtendedPlayer } from './ParticipantItem';

// Import the Squad and Player types from the correct location
import { Squad, Player } from '../../../types/GameTypes';

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
      isInMatchSquad: true,
      // Add the missing properties required by the Player interface
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 },
      // Optional properties that might be needed later
      playTime: 0,
      lastStart: 0,
      playIntervals: [],
      status: 'bench'
    }));
    
    setSelectedSquad((prevState: Squad | null) => ({
      // Ensure we have the required Squad properties
      id: prevState?.id || `temp-${Date.now()}`,
      name: prevState?.name || 'Match Squad',
      // Include the selected players
      players: selectedPlayers as Player[]
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