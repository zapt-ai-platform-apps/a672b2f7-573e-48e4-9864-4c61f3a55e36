import { Position, Player } from '../../../../types/GameTypes';

export interface ExtendedPlayer extends Omit<Player, 'position' | 'totalPlayTime' | 'isOnField' | 'isGoalkeeper'> {
  id: string;
  name: string;
  isInMatchSquad: boolean;
  number?: string;
  // Add required properties from Player type
  totalPlayTime: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  position: Position;
}