import { Player } from '../../../types/GameTypes';
import { getTimeElapsed } from './timerOperations';

export function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) {
    console.error('getTotalPlayTime: player is undefined');
    return 0;
  }
  return player.totalPlayTime ?? 0;
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: any[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore++;
  } else {
    newOpponentScore++;
  }
  const time = getTimeElapsed(gameIntervals, isRunning);
  const newGoals = [...goals, { team, scorerName, time }];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(players: Player[], playerId: number | string, isAdding: boolean): Player[] {
  if (isAdding) {
    const newPlayer: Player = { 
      id: playerId.toString(), 
      name: 'Player ' + playerId, 
      totalPlayTime: 0, 
      isOnField: true, 
      isGoalkeeper: false, 
      position: { x: 0, y: 0 }  // Initialize with numeric values
    };
    return [...players, newPlayer];
  } else {
    return players.filter(player => player.id !== playerId);
  }
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}