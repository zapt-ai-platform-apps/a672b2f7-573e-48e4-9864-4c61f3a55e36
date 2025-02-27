import { Player } from '../../../shared/models/player';

// Fix: Ensure we create players with all required properties
export const createPlayer = (id: string, name: string): Player => {
  return {
    id,
    name,
    isInMatchSquad: false,
    isInStartingLineup: false,
    playIntervals: [],
    position: null,
    isGoalkeeper: false,
    goals: []
  };
};

export const togglePlayerInMatchSquad = (player: Player): Player => {
  return {
    ...player,
    isInMatchSquad: !player.isInMatchSquad,
    // If removing from match squad, also remove from starting lineup
    isInStartingLineup: player.isInMatchSquad ? false : player.isInStartingLineup
  };
};

export const togglePlayerInStartingLineup = (player: Player): Player => {
  // Can only be in starting lineup if they're in the match squad
  if (!player.isInMatchSquad) {
    return player;
  }
  
  return {
    ...player,
    isInStartingLineup: !player.isInStartingLineup
  };
};