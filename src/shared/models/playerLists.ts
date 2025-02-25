import { Player } from '../../types/GameTypes';

export function getPlayerLists(
  players: Player[],
  includeGKPlaytime: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(p => p.isOnField);
  const offField = players.filter(p => !p.isOnField);
  
  return { onField, offField };
}