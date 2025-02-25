import { Player } from '../../../types/GameTypes';

export interface ExtendedPlayer extends Player {
  isInMatchSquad?: boolean;
}

export interface Squad {
  id: string;
  name: string;
  players: ExtendedPlayer[];
}