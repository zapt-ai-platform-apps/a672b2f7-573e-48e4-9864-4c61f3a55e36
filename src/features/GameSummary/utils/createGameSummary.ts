import { formatTime } from '../../../models/timeUtils';

export function createGameSummary(gameState: {
  teamName: string;
  opponentName: string;
  matchDate: string;
  gameLocation: string;
  teamScore: number;
  opponentScore: number;
  goalsList: {
    id: string;
    playerId: string;
    playerName: string;
    time: number;
    isOpponentGoal: boolean;
  }[];
  activePlayersList: {
    id: string;
    name: string;
    position: string;
    status: string;
    minutesPlayed: number;
    entryTimes: number[];
    exitTimes: number[];
  }[];
  benchPlayersList: {
    id: string;
    name: string;
    position: string;
    status: string;
    minutesPlayed: number;
    entryTimes: number[];
    exitTimes: number[];
  }[];
}) {
  const {
    teamName,
    opponentName,
    matchDate,
    gameLocation,
    teamScore,
    opponentScore,
    goalsList,
    activePlayersList,
    benchPlayersList
  } = gameState;

  let summary = '';
  summary += `Match Summary: ${teamName} vs. ${opponentName}\n`;

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  summary += `Date: ${new Date(matchDate).toLocaleDateString('en-US', options)}\n`;

  if (gameLocation && gameLocation.trim() !== '') {
    summary += `Location: ${gameLocation}\n`;
  }

  summary += `Final Score: ${teamScore} - ${opponentScore}\n\n`;
  summary += 'Goals:\n';

  if (!goalsList || goalsList.length === 0) {
    summary += 'None\n';
  } else {
    for (const goal of goalsList) {
      const playerName = goal.isOpponentGoal ? 'Opponent' : goal.playerName;
      summary += `${playerName} (${formatTime(goal.time)})\n`;
    }
  }

  summary += '\n';
  summary += 'Player Play Times:\n';
  const players = [...activePlayersList, ...benchPlayersList];
  for (const player of players) {
    summary += `${player.name}: ${player.minutesPlayed} min\n`;
  }

  return summary;
}