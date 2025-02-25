import { addGoal as recordGoal, removeLastGoal } from '../../models/scoreCalculations';
// Use export type for type re-exports to avoid issues with isolatedModules
import type { Goal } from '../../types/GameTypes';

export { recordGoal, removeLastGoal };
export type { Goal };