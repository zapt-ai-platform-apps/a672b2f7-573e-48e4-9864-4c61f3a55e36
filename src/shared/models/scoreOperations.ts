import { addGoal as recordGoal, removeLastGoal } from '../../models/scoreCalculations';
// Use export type for type re-exports to avoid issues with isolatedModules
import type { Goal } from '../../types/GameTypes';

// Export both names to maintain compatibility with both import styles
export { recordGoal, removeLastGoal, recordGoal as addGoal };
export type { Goal };