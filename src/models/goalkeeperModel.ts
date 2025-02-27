import { Player } from '../shared/models/player';

interface GoalkeeperData {
  id: string;
  name: string;
}

/**
 * Create a goalkeeper player with all required Player properties
 */
export const createGoalkeeper = (data: GoalkeeperData): Player => {
  return {
    id: data.id,
    name: data.name,
    isInMatchSquad: true,
    isInStartingLineup: true,
    isGoalkeeper: true,
    position: 'goalkeeper',
    playIntervals: [], // Fix: Initialize with empty array
    goals: []
  };
};

/**
 * Converts an array of goalkeeper data to fully formed Player objects
 */
export const convertGoalkeepersToPlayers = (goalkeepers: GoalkeeperData[]): Player[] => {
  return goalkeepers.map(createGoalkeeper);
};

/**
 * Returns a player marked as the new goalkeeper
 */
export const assignGoalkeeper = (player: Player): Player => {
  return {
    ...player,
    isGoalkeeper: true,
    position: 'goalkeeper'
  };
};

/**
 * Returns a player with goalkeeper status removed
 */
export const removeGoalkeeperStatus = (player: Player): Player => {
  return {
    ...player,
    isGoalkeeper: false,
    position: null
  };
};