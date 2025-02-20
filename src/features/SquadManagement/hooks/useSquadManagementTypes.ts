export interface Squad {
  id: number | string;
  name: string;
  players: string[];
  [key: string]: unknown;
}