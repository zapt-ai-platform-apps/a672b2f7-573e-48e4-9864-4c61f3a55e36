export function formatTime(seconds: number): string {
  const safeSeconds = seconds < 0 ? 0 : seconds;
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');
  return `${paddedMins}:${paddedSecs}`;
}

type Player = {
  id: string;
  name: string;
  position: string;
  status: string;
  minutesPlayed: number;
  entryTimes: number[];
  exitTimes: number[];
};

export function calculateMinutesPlayed(player: Player, gameTime: number, isTimerRunning: boolean): number {
  if (!isTimerRunning) {
    return player.minutesPlayed;
  }
  let totalSeconds = 0;
  const { entryTimes, exitTimes } = player;
  const pairedRounds = Math.min(entryTimes.length, exitTimes.length);
  for (let i = 0; i < pairedRounds; i++) {
    totalSeconds += exitTimes[i] - entryTimes[i];
  }
  if (entryTimes.length > exitTimes.length) {
    totalSeconds += gameTime - entryTimes[entryTimes.length - 1];
  }
  return Math.floor(totalSeconds / 60);
}