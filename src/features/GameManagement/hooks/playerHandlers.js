import { processPlayerLists } from '../../../shared/models/playerUtils.js';

export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  const { onField, offField } = processPlayerLists(
    playerData.filter(p => p.isInMatchSquad),
    includeGKPlaytime,
    isRunning
  );
  return { onField, offField };
}

export function assignGoalkeeper(goalkeeper, playerData, setGoalkeeper) {
  if (!goalkeeper && playerData.length > 0) {
    const firstGK = playerData.find(p => p.position === 'Goalkeeper');
    setGoalkeeper(firstGK?.id || playerData[0]?.id);
  }
}

export function handlePlayerAdjustment(playerId, setPlayerData, isAdding) {
  setPlayerData(prevPlayers => {
    return prevPlayers.map(player => {
      if (player.id === playerId) {
        return { ...player, isInStartingLineup: isAdding };
      }
      return player;
    });
  });
}