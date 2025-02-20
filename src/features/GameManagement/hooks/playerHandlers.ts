import { processPlayerLists } from '../../../shared/models/playerUtils';

export function updatePlayerLists(
  playerData: any[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: any[]; offField: any[] } {
  const { onField, offField } = processPlayerLists(
    playerData.filter(p => p.isInMatchSquad),
    includeGKPlaytime,
    isRunning
  );
  return { onField, offField };
}

export function assignGoalkeeper(
  goalkeeper: string,
  playerData: any[],
  setGoalkeeper: (goalkeeper: string) => void
): void {
  if (!goalkeeper && playerData.length > 0) {
    const firstGK = playerData.find(p => p.position === 'Goalkeeper');
    setGoalkeeper(firstGK?.id || playerData[0]?.id);
  }
}

export function handlePlayerAdjustment(
  playerId: string | number,
  setPlayerData: (updater: (prev: any[]) => any[]) => void,
  isAdding: boolean
): void {
  setPlayerData(prevPlayers => {
    return prevPlayers.map(player => {
      if (player.id === playerId) {
        return { ...player, isInStartingLineup: isAdding };
      }
      return player;
    });
  });
}