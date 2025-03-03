export function makeSubstitution({
  playerData,
  setPlayerData,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  isRunning,
  updatePlayerLists
}) {
  if (!selectedSubOffPlayer || !selectedSubOnPlayer) {
    console.error("Cannot make substitution: missing player(s)");
    return false;
  }

  const currentTime = Date.now();
  
  setPlayerData(prev =>
    prev.map((player) => {
      // Player coming off the field
      if (player.name === selectedSubOffPlayer.name) {
        const updatedIntervals = [...player.playIntervals];
        
        // Close the current interval if the player is coming off and the game is running
        if (isRunning && updatedIntervals.length > 0) {
          const lastInterval = updatedIntervals[updatedIntervals.length - 1];
          if (!lastInterval.endTime) {
            updatedIntervals[updatedIntervals.length - 1] = {
              ...lastInterval,
              endTime: currentTime
            };
          }
        }
        
        return { 
          ...player, 
          isOnField: false,
          playIntervals: updatedIntervals
        };
      }
      
      // Player coming on the field
      if (player.name === selectedSubOnPlayer.name) {
        let updatedIntervals = [...player.playIntervals];
        
        // Start a new interval if the game is running
        if (isRunning) {
          updatedIntervals.push({
            startTime: currentTime,
            endTime: null,
            isGoalkeeper: player.isGoalkeeper
          });
        }
        
        return { 
          ...player, 
          isOnField: true,
          playIntervals: updatedIntervals
        };
      }
      
      return player;
    })
  );
  
  // Update player lists to reflect the changes
  if (typeof updatePlayerLists === 'function') {
    updatePlayerLists();
  }
  
  return true;
}