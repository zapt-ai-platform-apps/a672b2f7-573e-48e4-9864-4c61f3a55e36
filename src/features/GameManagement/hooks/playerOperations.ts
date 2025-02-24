import { getTimeElapsed } from './timeOperations';

function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: any[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const elapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoal = { team, scorer: scorerName, time: elapsed };
  const newGoals = [...goals, newGoal];
  const newOurScore = team === 'our' ? ourScore + 1 : ourScore;
  const newOpponentScore = team === 'opponent' ? opponentScore + 1 : opponentScore;
  return { newOurScore, newOpponentScore, newGoals };
}

function handlePlayerAdjustment(playerData: any[], playerId: number | string, isAdding: boolean): any[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

interface PlayerLists {
  onField: any[];
  offField: any[];
}

function updatePlayerLists(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): PlayerLists {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}

export { recordGoal, handlePlayerAdjustment, updatePlayerLists };