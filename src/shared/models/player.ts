/**
 * Creates a new player object.
 * @param param0 - Player input data.
 * @returns The newly created player object.
 */
export function createPlayer({ name, isInMatchSquad, isInStartingLineup }: { name: string; isInMatchSquad?: boolean; isInStartingLineup?: boolean }): any {
  return {
    id: Date.now() + Math.random(),
    name,
    isInMatchSquad: isInMatchSquad || false,
    isInStartingLineup: isInStartingLineup || false,
    playTime: 0,
    position: 'field'
  };
}