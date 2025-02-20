/**
 * Creates a summary of the game based on the provided game data.
 * @param gameData - An object containing game information.
 * @returns An object containing summary text, final score, and total goals.
 */
export function createGameSummary(gameData: {
  goals: { team: string; scorerName?: string | null; time: number; timestamp: number }[];
  ourScore: number;
  opponentScore: number;
  gameDuration: number;
}): {
  summaryText: string;
  finalScore: string;
  totalGoals: number;
} {
  const { goals, ourScore, opponentScore, gameDuration } = gameData;
  const totalGoals = goals.length;
  const finalScore = `${ourScore} - ${opponentScore}`;
  const summaryText = `Game lasted ${gameDuration} seconds with final score ${finalScore} and ${totalGoals} goal${totalGoals !== 1 ? 's' : ''}.`;
  return { summaryText, finalScore, totalGoals };
}