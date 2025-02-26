import { assignGoalkeeper, getCurrentGoalkeeper } from './playerGoalkeeperHandlers';
import { handlePlayerAdjustment } from './gameActionsHelpers';
import type { Player, Goal } from '../../../types/GameTypes';
import * as Sentry from '@sentry/browser';

/**
 * Assigns a player as goalkeeper
 */
export function handleAssignGoalkeeper(
  playerData: Player[],
  playerId: string,
  setPlayerData: (players: Player[]) => void
): void {
  try {
    const updatedPlayers = assignGoalkeeper(playerData, playerId);
    setPlayerData(updatedPlayers);
  } catch (error) {
    console.error('Error handling goalkeeper assignment:', error);
    Sentry.captureException(error);
  }
}

/**
 * Removes the last goal from the goals array
 */
export function handleRemoveLastGoal(
  goals: Goal[],
  setGoals: (goals: Goal[]) => void,
  ourScore: number,
  opponentScore: number,
  setOurScore: (score: number) => void,
  setOpponentScore: (score: number) => void
): void {
  try {
    if (goals.length === 0) return;

    const lastGoal = goals[goals.length - 1];
    const newGoals = [...goals];
    newGoals.pop();
    setGoals(newGoals);

    // Update the score based on whose goal was removed
    if (lastGoal.team === 'our') {
      setOurScore(Math.max(0, ourScore - 1));
    } else {
      setOpponentScore(Math.max(0, opponentScore - 1));
    }
  } catch (error) {
    console.error('Error removing last goal:', error);
    Sentry.captureException(error);
  }
}

/**
 * Increases the number of players on the field
 */
export function handleIncreasePlayers(
  playerData: Player[],
  setPlayerData: (players: Player[]) => void
): void {
  try {
    // Find first player who is not on field
    const playerToAdd = playerData.find(player => !player.isOnField);
    if (!playerToAdd) return; // No players available to add

    const updatedPlayers = handlePlayerAdjustment(playerData, playerToAdd.id || '', true);
    setPlayerData(updatedPlayers);
  } catch (error) {
    console.error('Error increasing players:', error);
    Sentry.captureException(error);
  }
}

/**
 * Decreases the number of players on the field
 */
export function handleDecreasePlayers(
  playerData: Player[],
  setPlayerData: (players: Player[]) => void
): void {
  try {
    // Find last player who is on field but not goalkeeper
    const reversedPlayers = [...playerData].reverse();
    const playerToRemove = reversedPlayers.find(
      player => player.isOnField && !player.isGoalkeeper
    );
    
    if (!playerToRemove) return; // No suitable players to remove

    const updatedPlayers = handlePlayerAdjustment(playerData, playerToRemove.id || '', false);
    setPlayerData(updatedPlayers);
  } catch (error) {
    console.error('Error decreasing players:', error);
    Sentry.captureException(error);
  }
}

/**
 * Gets the current goalkeeper
 */
export function getGoalkeeper(playerData: Player[]): Player | null {
  return getCurrentGoalkeeper(playerData);
}