export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string | null;
  time: number;
  timestamp: number;
}