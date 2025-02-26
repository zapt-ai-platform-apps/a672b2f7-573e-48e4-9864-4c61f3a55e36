import { Player } from '../../../../types/GameTypes';

export interface ExtendedPlayer extends Player {
  isInMatchSquad: boolean;
  number?: string;
}