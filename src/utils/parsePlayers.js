export function parsePlayers(playersData) {
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