// Import the ExtendedPlayer type from the main types file
import { ExtendedPlayer } from '../../../../features/GameSetup/types/ExtendedPlayer';

// Re-export the type for convenience
export type { ExtendedPlayer };

// Add any additional types specific to the participant screen here
export interface ParticipantScreenProps {
  onComplete?: () => void;
}