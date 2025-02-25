import { formatTime } from '../../../models/timeUtils';
import { Player, Goal, GameSummaryProps } from '../types';

export function createGameSummary(gameState: GameSummaryProps): string {
  const {
    teamName = 'Our Team',
    opponentName = 'Opponent',
    matchDate = new Date().toISOString(),
    gameLocation = '',
    ourScore = gameState.teamScore || 0,
    opponentScore = gameState.opponentScore || 0,
    goals = gameState.goalsList || [],
    playerData = [],
    activePlayersList = [],
    benchPlayersList = [],
    getTotalPlayTime,
    formatTime: customFormatTime
  } = gameState;

  const timeFormatter = customFormatTime || formatTime;

  let summary = '';
  summary += `Match Summary: ${teamName} vs. ${opponentName}\n`;

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  summary += `Date: ${new Date(matchDate).toLocaleDateString('en-US', options)}\n`;

  if (gameLocation && gameLocation.trim() !== '') {
    summary += `Location: ${gameLocation}\n`;
  }

  summary += `Final Score: ${ourScore} - ${opponentScore}\n\n`;
  summary += 'Goals:\n';

  const safeGoals = Array.isArray(goals) ? goals : [];
  
  if (safeGoals.length === 0) {
    summary += 'None\n';
  } else {
    for (const goal of safeGoals) {
      const isOpponentGoal = goal.isOpponentGoal || goal.team === 'opponent';
      const playerName = isOpponentGoal 
        ? 'Opponent' 
        : goal.playerName || goal.scorerName || 'Unknown player';
      
      const time = goal.time || 0;
      summary += `${playerName} (${timeFormatter(time)})\n`;
    }
  }

  summary += '\n';
  summary += 'Player Play Times:\n';
  
  let allPlayers: Player[] = [];
  
  if (Array.isArray(playerData) && playerData.length > 0) {
    allPlayers = playerData;
  } else {
    const activePlayers = Array.isArray(activePlayersList) ? activePlayersList : [];
    const benchPlayers = Array.isArray(benchPlayersList) ? benchPlayersList : [];
    allPlayers = [...activePlayers, ...benchPlayers];
  }
  
  if (allPlayers.length === 0) {
    summary += 'No player data available\n';
  } else {
    for (const player of allPlayers) {
      const playTime = getTotalPlayTime 
        ? getTotalPlayTime(player) 
        : (player.minutesPlayed || 0);
        
      summary += `${player.name}: ${playTime} min\n`;
    }
  }

  return summary;
}