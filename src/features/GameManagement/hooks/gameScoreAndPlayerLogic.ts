import { GameInterval } from './gameTimerLogic';
import { Player } from '../../../types/GameTypes';

export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: GameInterval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  const goalRecord = {
    team,
    scorerName,
    time: Date.now()
  };
  const newGoals = [...goals, goalRecord];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustmentLogic(players: Player[], playerId: string | number, isAdding: boolean): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerListsLogic(players: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(player => player.isOnField);
  const offField = players.filter(player => !player.isOnField);
  return { onField, offField };
}