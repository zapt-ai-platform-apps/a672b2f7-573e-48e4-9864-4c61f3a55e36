export function parsePlayers(playersData) {
  if (typeof playersData === 'string') {
    try {
      const parsed = JSON.parse(playersData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      // Fallback: treat playersData as a comma-separated string
      return playersData.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
  }
  return [];
}