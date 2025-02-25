/**
 * Game model consolidates game related functions.
 */
import { getTimeElapsed, toggleTimer } from '../../models/timerModel';
import { recordGoal } from './scoreOperations';
import { handlePlayerAdjustment, updatePlayerLists, performSubstitution } from './playerUtils';

export { getTimeElapsed, toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists, performSubstitution };