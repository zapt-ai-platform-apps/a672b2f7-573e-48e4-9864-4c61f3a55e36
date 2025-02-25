function formatTime(time: number): string {
  if (time < 0) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculateMinutesPlayed(
  player: {
    id: string;
    name: string;
    position: string;
    status: string;
    minutesPlayed: number;
    entryTimes: number[];
    exitTimes: number[];
  },
  gameTime: number,
  isTimerRunning: boolean
): number {
  let total = 0;
  const completedPeriods = Math.min(player.entryTimes.length, player.exitTimes.length);
  for (let i = 0; i < completedPeriods; i++) {
    const diff = player.exitTimes[i] - player.entryTimes[i];
    total += diff > 0 ? diff : 0;
  }
  if (isTimerRunning && player.entryTimes.length > player.exitTimes.length) {
    const lastEntry = player.entryTimes[player.entryTimes.length - 1];
    const diff = gameTime - lastEntry;
    total += diff > 0 ? diff : 0;
  }
  return total;
}

export { formatTime, calculateMinutesPlayed };