import { useState, useEffect } from 'react';

function usePlayerManagement({ playerData = [], setPlayerData, includeGKPlaytime, isRunning, now }) {
  const [onFieldPlayers, setOnFieldPlayers] = useState([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);

  const getTotalPlayTime = (player) => {
    if (!player || !Array.isArray(player.playIntervals)) return 0;
    
    let total = 0;
    player.playIntervals.forEach((interval) => {
      // Skip goalkeeper intervals if we're not including GK playtime
      if (!includeGKPlaytime && interval.isGoalkeeper) return;
      
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning && player.isOnField) {
        // Only add current interval time if the player is on the field and the game is running
        total += now - interval.startTime;
      }
    });
    
    return Math.floor(total / 1000);
  };

  const updatePlayerLists = () => {
    if (!Array.isArray(playerData)) return;
    
    // Calculate total play time for each player for sorting
    const playersWithTime = playerData.map(player => ({
      ...player,
      calculatedPlayTime: getTotalPlayTime(player)
    }));
    
    // Update on-field players list
    setOnFieldPlayers(
      playersWithTime
        .filter((player) => player.isOnField)
        .sort((a, b) => a.calculatedPlayTime - b.calculatedPlayTime)
    );
    
    // Update off-field players list
    setOffFieldPlayers(
      playersWithTime
        .filter((player) => !player.isOnField)
        .sort((a, b) => a.calculatedPlayTime - b.calculatedPlayTime)
    );
  };

  // Update player lists whenever relevant data changes
  useEffect(() => {
    updatePlayerLists();
  }, [playerData, now, isRunning, includeGKPlaytime]);

  return { onFieldPlayers, offFieldPlayers, updatePlayerLists, getTotalPlayTime };
}

export default usePlayerManagement;