// This file re-exports hooks to make them available from a common location
// This can help with import paths in tests and components

export { useAuthSession } from './useAuthSession';
export { useGameManagement } from './useGameManagement';
export { useGameState } from './useGameState';
export { useGameTimer } from './useGameTimer';
export { useSquadManagement } from './useSquadManagement';
export { useStateContext } from './useStateContext';