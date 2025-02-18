export function createPlayer({ name, isInMatchSquad, isInStartingLineup }) {
  return {
    id: Date.now() + Math.random(),
    name,
    isInMatchSquad,
    isInStartingLineup,
    playTime: 0,
    position: 'field'
  };
}