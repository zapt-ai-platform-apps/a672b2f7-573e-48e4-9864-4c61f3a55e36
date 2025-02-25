export interface Position {
  x: number;
  y: number;
}

export interface PlayerType {
  id: string;
  name: string;
  number?: string;
  totalPlayTime: number;
  playTime?: number;
  lastStart?: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  isInMatchSquad?: boolean;
  isStartingPlayer?: boolean;
  isInStartingLineup?: boolean;
  position: Position;
  // Add missing properties needed by Game Summary
  status?: string;
  minutesPlayed?: number;
  playIntervals?: Array<{ 
    start: number; 
    end?: number;
    startTime?: number;
    endTime?: number | null;
    isGoalkeeper?: boolean;
  }>;
}

export interface PitchProps {
  players: PlayerType[];
  hideLabel?: boolean;
  pitchRef?: React.RefObject<HTMLDivElement>;
  playerData?: PlayerType[];
  handlePointerDown?: (e: React.PointerEvent, playerId: string) => void;
}

export interface PlayerProps {
  player: PlayerType;
  position: Position;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
}