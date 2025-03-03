/**
 * Formats time in seconds to MM:SS format
 * @param {number} timeInSeconds - Time value in seconds
 * @returns {string} Formatted time string (MM:SS)
 */
export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}