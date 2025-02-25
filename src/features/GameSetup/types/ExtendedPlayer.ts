export interface ExtendedPlayer {
  id: string;
  name: string;
  isInMatchSquad: boolean;
  totalPlayTime: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  position: string | null;
}