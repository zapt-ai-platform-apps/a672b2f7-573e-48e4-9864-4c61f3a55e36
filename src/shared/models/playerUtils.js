export function processPlayerLists(players, includeGKPlaytime, isRunning) {
  const onField = [];
  const offField = [];

  players.forEach(player => {
    const totalTime = calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
    const playerWithTime = { ...player, totalTime };
    
    if (player.isInStartingLineup) {
      onField.push(playerWithTime);
    } else {
      offField.push(playerWithTime);
    }
  });

  return { 
    onField: onField.sort((a, b) => a.position.localeCompare(b.position)),
    offField: offField.sort((a, b) => a.name.localeCompare(b.name))
  };
}

export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  const intervals = player.playIntervals || [];
  
  intervals.forEach(interval => {
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning) {
      total += Date.now() - interval.start;
    }
  });

  if (player.position === 'Goalkeeper' && !includeGKPlaytime) {
    return 0;
  }
  
  return Math.floor(total / 1000);
}

export function calculateElapsedTime(intervals, isRunning) {
  let total = 0;
  
  intervals.forEach(interval => {
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning) {
      total += Date.now() - interval.start;
    }
  });

  return Math.floor(total / 1000);
}