/**
 * Parses raw players data and returns an array of players.
 *
 * @param playersData - The raw players data provided as a JSON string, comma-separated string, or an array.
 * @returns An array of parsed player items.
 */
export function parsePlayers(playersData: string | any[]): any[] {
  if (!playersData) return [];
  if (typeof playersData === 'string') {
    try {
      const parsed = JSON.parse(playersData);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return playersData.split(',').map(p => {
        const trimmed = p.trim();
        return trimmed.startsWith('"') ? JSON.parse(trimmed) : trimmed;
      }).filter(Boolean);
    }
  }
  return Array.isArray(playersData) ? playersData : [];
}