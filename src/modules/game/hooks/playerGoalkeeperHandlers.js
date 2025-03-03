export function createGoalkeeperHandlers(props, setShowGKModal, setShowGKConfirmModal) {
  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = props.goalkeeper;
    const currentTime = Date.now();
    
    props.setPlayerData((prevPlayers) =>
      prevPlayers.map((player) => {
        // Handle new goalkeeper
        if (player.name === playerName) {
          let updatedIntervals = [...(player.playIntervals || [])];
          
          // If the game is running and the player is on field, end current interval and start a new one as GK
          if (props.isRunning && player.isOnField) {
            // End current interval if exists
            if (updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
              updatedIntervals[updatedIntervals.length - 1] = {
                ...updatedIntervals[updatedIntervals.length - 1],
                endTime: currentTime
              };
            }
            
            // Start new interval as goalkeeper
            updatedIntervals.push({ 
              startTime: currentTime, 
              endTime: null, 
              isGoalkeeper: true 
            });
          }
          
          return { 
            ...player, 
            isGoalkeeper: true,
            playIntervals: updatedIntervals
          };
        } 
        // Handle previous goalkeeper
        else if (player.name === previousGoalkeeperName) {
          let updatedIntervals = [...(player.playIntervals || [])];
          
          // If the game is running and the player is on field, end current interval and start a new one as field player
          if (props.isRunning && player.isOnField) {
            // End current interval if exists
            if (updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
              updatedIntervals[updatedIntervals.length - 1] = {
                ...updatedIntervals[updatedIntervals.length - 1],
                endTime: currentTime
              };
            }
            
            // Start new interval as field player
            updatedIntervals.push({ 
              startTime: currentTime, 
              endTime: null, 
              isGoalkeeper: false 
            });
          }
          
          return { 
            ...player, 
            isGoalkeeper: false,
            playIntervals: updatedIntervals
          };
        } 
        
        return player;
      })
    );

    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    
    if (typeof props.updatePlayerLists === 'function') {
      props.updatePlayerLists();
    }
  };

  const availableGoalkeepers = () => {
    if (!Array.isArray(props.onFieldPlayers)) return [];
    return props.onFieldPlayers.filter((player) => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}