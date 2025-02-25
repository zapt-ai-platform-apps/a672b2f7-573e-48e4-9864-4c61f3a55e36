export interface Player {
  id: string;
  name: string;
  position?: string;
  status?: string;
  minutesPlayed?: number;
  entryTimes?: number[];
  exitTimes?: number[];
  [key: string]: any;
}

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
  teamScore?: number;
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