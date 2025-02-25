import { Player as GlobalPlayer } from '../../types/GameTypes';

// Export the global Player type for use in this feature
export type Player = GlobalPlayer;

export interface Goal {
  id?: string;
  playerId?: string;
  playerName?: string;
  team?: string;
  scorerName?: string;
  time?: number;
  isOpponentGoal?: boolean;
  [key: string]: any;
}

export interface GameSummaryProps {
  teamName?: string;
  opponentName?: string;
  matchDate?: string;
  gameLocation?: string;
  ourScore?: number;
  opponentScore?: number;
  goals?: Goal[];
  goalsList?: Goal[];
  playerData?: Player[];
  activePlayersList?: Player[];
  benchPlayersList?: Player[];
  getTotalPlayTime?: (player: Player) => number;
  formatTime?: (seconds: number) => string;
  includeGKPlaytime?: boolean;
}