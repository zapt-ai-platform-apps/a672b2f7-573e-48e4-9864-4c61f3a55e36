/**
 * @file Game model consolidates game related functions.
 * @typedef {Object} GameModel
 * Contains functions: getTimeElapsed, toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists, performSubstitution.
 */
import { getTimeElapsed, toggleTimer } from './timerModel';
import { recordGoal } from './scoreModel';
import { handlePlayerAdjustment, updatePlayerLists, performSubstitution } from './playerModel';

export { getTimeElapsed, toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists, performSubstitution };