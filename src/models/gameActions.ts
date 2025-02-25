import { Player } from '../types/GameTypes';

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  intervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore++;
  } else {
    newOpponentScore++;
  }
  const newGoals = [...goals, { team, scorer: scorerName }];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(
  players: Player[],
  playerId: number | string,
  isAdding: boolean
): Player[] {
  if (isAdding) {
    const exists = players.find((p) => p.id === playerId);
    if (!exists) {
      return [
        ...players, 
        { 
          id: playerId.toString(), 
          name: "Player " + playerId, 
          playTime: 0,
          totalPlayTime: 0,
          isOnField: false,
          isGoalkeeper: false,
          position: { x: 0, y: 0 }
        }
      ];
    }
    return players;
  } else {
    return players.filter((p) => p.id !== playerId);
  }
}

export function updatePlayerLists(
  players: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter((p) => p.isOnField);
  const offField = players.filter((p) => !p.isOnField);
  return { onField, offField };
}