/**
 * @typedef {Object} Player
 * @property {number|string} id - Unique identifier.
 * @property {boolean} isInMatchSquad - Whether the player is in the match squad.
 * @property {boolean} isOnField - Whether the player is currently on the field.
 * @property {Array<{startTime: number, endTime: number|null}>} [playIntervals] - Array of play intervals.
 */

import { updatePlayerLists } from './updatePlayerLists.js';
import { performSubstitution } from './performSubstitution.js';

export { updatePlayerLists, performSubstitution };