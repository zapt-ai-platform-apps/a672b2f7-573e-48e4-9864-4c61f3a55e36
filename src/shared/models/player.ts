import type { Player } from '../../types/GameTypes';

export function createPlayer({
  name,
  isInMatchSquad,
  isInStartingLineup
}: {
  name: string;
  isInMatchSquad?: boolean;
  isInStartingLineup?: boolean;
}): Player & { isInMatchSquad?: boolean; isInStartingLineup?: boolean } {
  return {
    id: Date.now() + Math.random(),
    name,
    playIntervals: [],
    isOnField: false,
    isGoalkeeper: false,
    totalPlayTime: 0,
    position: { x: null, y: null },
    isInMatchSquad: isInMatchSquad ?? false,
    isInStartingLineup: isInStartingLineup ?? false,
  };
}