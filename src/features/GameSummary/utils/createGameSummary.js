function createGameSummary(ourScore, opponentScore, playerData, goals, includeGKPlaytime, getTotalPlayTime, formatTime) {
  let summaryText = `Final Score: Our Team ${ourScore} - ${opponentScore} Opponent Team\n\n`;

  const goalsByPlayerData = {};
  goals
    .filter((goal) => goal.team === 'our')
    .forEach((goal) => {
      const scorer = goal.scorerName;
      if (goalsByPlayerData[scorer]) {
        goalsByPlayerData[scorer]++;
      } else {
        goalsByPlayerData[scorer] = 1;
      }
    });

  summaryText += 'Goals by Our Team:\n';
  if (Object.keys(goalsByPlayerData).length > 0) {
    Object.entries(goalsByPlayerData).forEach(([playerName, goalCount]) => {
      summaryText += `- ${playerName}: ${goalCount} goal${goalCount !== 1 ? 's' : ''}\n`;
    });
  } else {
    summaryText += 'No goals scored by our team.\n';
  }

  summaryText += '\nPlayer Playtimes:\n';
  [...playerData]
    .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
    .forEach((player) => {
      summaryText += `- ${player.name}: ${formatTime(getTotalPlayTime(player))}\n`;
    });

  if (!includeGKPlaytime) {
    summaryText += '\nNote: Playtime for goalkeepers is not included.\n';
  }

  return summaryText;
}

export default createGameSummary;