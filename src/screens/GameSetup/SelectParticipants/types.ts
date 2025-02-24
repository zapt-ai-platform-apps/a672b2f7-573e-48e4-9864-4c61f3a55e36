import type { Player } from '../../../context/StateContext';

export interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
}