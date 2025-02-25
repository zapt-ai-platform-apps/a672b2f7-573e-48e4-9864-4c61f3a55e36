import { Player } from '../../../types/GameTypes';

export interface Squad {
  id: string;
  name: string;
  players: Player[] | string; // Updated to allow both parsed Player[] or string (from DB)
}