import { Player } from '../../types/GameTypes';

export interface Squad {
  id: number;
  name: string;
  players: Player[] | string;
  createdAt?: string;
  userId?: string;
}