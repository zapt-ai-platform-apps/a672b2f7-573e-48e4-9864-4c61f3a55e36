/**
 * Creates a game summary text for sharing.
 *
 * @param {number} ourScore - Score of our team.
 * @param {number} opponentScore - Score of the opponent team.
 * @param {Array} playerData - Array of player objects.
 * @param {Array} goals - Array of goal objects.
 * @param {boolean} includeGKPlaytime - Flag indicating if goalkeeper playtime is included.
 * @param {Function} getTotalPlayTime - Function to get the total play time (in seconds) for a player.
 * @param {Function} formatTime - Function to format a time value (in seconds) into MM:SS format.
 * @returns {string} The game summary text.
 */
function createGameSummary(ourScore, opponentScore, playerData, goals, includeGKPlaytime, getTotalPlayTime, formatTime) {
  let summaryText = `Final Score: Our Team ${ourScore} - ${opponentScore} Opponent Team\n\n`;
  const goalsByPlayerData = {};
  goals.filter((goal) => goal.team === 'our').forEach((goal) => {
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
  [...(Array.isArray(playerData) ? playerData : [])]
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