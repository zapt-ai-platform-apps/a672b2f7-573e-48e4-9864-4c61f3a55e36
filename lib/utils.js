export function parsePlayers(playersData) {
  try {
    const parsed = JSON.parse(playersData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}