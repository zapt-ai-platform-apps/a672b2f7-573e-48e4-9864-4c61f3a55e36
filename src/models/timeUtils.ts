/**
 * Formats seconds into a string representation of minutes and seconds (MM:SS).
 * @param seconds - The total number of seconds to format
 * @returns A string in the format MM:SS with leading zeros
 */
export function formatTime(seconds: number): string {
  // Handle negative values by returning 00:00
  if (seconds < 0) {
    return '00:00';
  }
  
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates the total minutes played based on entry and exit times.
 * @param entryTimes - Array of timestamps when the player entered the game
 * @param exitTimes - Array of timestamps when the player exited the game
 * @returns The total minutes played
 */
export function calculateMinutesPlayed(entryTimes: number[], exitTimes: number[]): number {
  if (!entryTimes || !exitTimes || entryTimes.length === 0) {
    return 0;
  }

  let totalSeconds = 0;
  for (let i = 0; i < entryTimes.length; i++) {
    const entry = entryTimes[i];
    const exit = i < exitTimes.length ? exitTimes[i] : Date.now();
    
    if (entry && exit) {
      const timePlayedMs = exit - entry;
      totalSeconds += Math.floor(timePlayedMs / 1000);
    }
  }
  
  return Math.floor(totalSeconds / 60);
}