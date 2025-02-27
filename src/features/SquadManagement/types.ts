import { Player } from '../../types/GameTypes';

export interface Squad {
  id: number;
  name: string;
  players: Player[];
  createdAt?: string;
  userId?: string;
}