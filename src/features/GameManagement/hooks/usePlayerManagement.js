import { useState, useEffect } from 'react';

/**
 * Custom hook for managing player lists based on field status.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Array} params.playerData - Array of player objects.
 * @param {Function} params.setPlayerData - Function to update player data.
 * @param {boolean} params.includeGKPlaytime - Flag determining whether to include goalkeeper playtime.
 * @param {boolean} params.isRunning - Flag indicating if the game timer is running.
 * @param {number} params.now - Current timestamp for playtime calculations.
 * @returns {Object} An object containing:
 *   - onFieldPlayers: Array of players currently on the field.
 *   - offFieldPlayers: Array of players currently off the field.
 *   - updatePlayerLists: Function to update the on/off field lists.
 *   - getTotalPlayTime: Function that calculates and returns total playtime for a given player.
 */
function usePlayerManagement({ playerData = [], setPlayerData, includeGKPlaytime, isRunning, now }) {
  const [onFieldPlayers, setOnFieldPlayers] = useState([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);

  const getTotalPlayTime = (player) => {
    let total = 0;
    player.playIntervals.forEach((interval) => {
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning ? now - interval.startTime : 0;
      }
    });
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      playerData
        .filter((player) => player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      playerData
        .filter((player) => !player.isOnField)
        .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  useEffect(() => {
    updatePlayerLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData, now]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;