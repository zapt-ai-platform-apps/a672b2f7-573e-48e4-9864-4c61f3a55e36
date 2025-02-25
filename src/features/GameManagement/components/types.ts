export interface Position {
  x: number;
  y: number;
}

export interface PlayerType {
  id: string;
  name: string;
  position: Position;
  [key: string]: any;
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