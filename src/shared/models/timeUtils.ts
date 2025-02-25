import { Player } from '../../types/GameTypes';

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export function calculateElapsedTime(
  startTime: number,
  endTime: number | null = null
): number {
  const end = endTime || Date.now();
  return Math.floor((end - startTime) / 1000);
}

export function calculateTotalPlayTime(
  intervals: { startTime: number; endTime: number | null }[]
): number {
  if (!intervals || intervals.length === 0) return 0;
  
  return intervals.reduce((total, interval) => {
    const elapsed = calculateElapsedTime(interval.startTime, interval.endTime);
    return total + elapsed;
  }, 0);
}

export function calculateMinPlayTime(players: Player[]): number {
  if (!players || players.length === 0) return 0;
  
  const playTimes = players.map(player => player.totalPlayTime || 0);
  return Math.min(...playTimes);
}