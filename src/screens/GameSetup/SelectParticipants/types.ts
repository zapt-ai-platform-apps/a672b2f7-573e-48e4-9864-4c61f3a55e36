import type { Player } from '../../../context/StateContext';

export interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
  id: string; // Explicitly define id as string
  selected?: boolean;
}