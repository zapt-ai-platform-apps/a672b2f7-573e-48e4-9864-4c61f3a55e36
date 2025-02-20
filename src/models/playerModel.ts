export interface Player {
  id: string | number;
  name: string;
  playTime?: number;
  playIntervals?: { startTime: number; endTime: number | null; isGoalkeeper?: boolean }[];
  isOnField?: boolean;
  isGoalkeeper?: boolean;
  [key: string]: unknown;
}