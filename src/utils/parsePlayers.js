export function parsePlayers(playersData) {
  if (!playersData) return [];
  if (typeof playersData === 'string') {
    try {
      const parsed = JSON.parse(playersData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Fallback: treat playersData as a comma-separated string and trim each name
      return playersData.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
  }
  if (Array.isArray(playersData)) {
    return playersData;
  }
  return [];
}