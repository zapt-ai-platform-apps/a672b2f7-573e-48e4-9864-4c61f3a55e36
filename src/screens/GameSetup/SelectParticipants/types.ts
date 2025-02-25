import { ExtendedPlayer as BaseExtendedPlayer } from '../../../features/GameSetup/types/ExtendedPlayer';

// Re-export ExtendedPlayer to maintain consistency
export type ExtendedPlayer = BaseExtendedPlayer;

export interface GameSetupParticipantsHandlersProps {
  selectedPlayers: ExtendedPlayer[];
  setSelectedSquad: (squad: any) => void;
  navigate: (path: string) => void;
  setErrorMessage: (message: string) => void;
}