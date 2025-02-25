// Import from gameManagementModel directly to ensure functions exist
import { 
  getTotalPlayTime, 
  getTimeElapsed, 
  toggleTimer, 
  recordGoal, 
  handlePlayerAdjustment, 
  updatePlayerLists 
} from '../../../models/gameManagementModel';

// Re-export the functions
export {
  getTotalPlayTime,
  getTimeElapsed,
  toggleTimer,
  recordGoal,
  handlePlayerAdjustment,
  updatePlayerLists
};