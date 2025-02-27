import { GameSummary, PlayerSummary, Goal, Player, GoalData, Substitution } from '../../../types/GameTypes';
import { formatTime } from '../../../shared/models/timeFormatters';

interface GameData {
  gameTime: number;
  players: Player[];
  ourGoals: Goal[];
  opponentGoals: Goal[];
  substitutions: Substitution[];
}

/**
 * Creates a game summary from the raw game data
 * @param gameData Raw game data
 * @returns Formatted game summary
 */
export function createGameSummary(gameData: GameData): GameSummary {
  const { gameTime, players, ourGoals, opponentGoals, substitutions } = gameData;
  
  // Calculate total play time for all players
  const playTimeTotal = players.reduce((total, player) => {
    return total + (player.totalPlayTime || 0);
  }, 0);
  
  // Calculate result
  const ourScore = ourGoals.length;
  const opponentScore = opponentGoals.length;
  let result: 'win' | 'loss' | 'draw';
  
  if (ourScore > opponentScore) {
    result = 'win';
  } else if (ourScore < opponentScore) {
    result = 'loss';
  } else {
    result = 'draw';
  }
  
  // Format all goals
  const allGoals: GoalData[] = [
    ...ourGoals.map(goal => ({
      id: goal.id || `our-${Date.now()}-${Math.random()}`,
      team: 'our' as const,
      minute: Math.floor(goal.time / 60),
      scorer: goal.scorerName || 'Unknown',
      timestamp: goal.time,
      scorerId: goal.scorerId
    })),
    ...opponentGoals.map(goal => ({
      id: goal.id || `opp-${Date.now()}-${Math.random()}`,
      team: 'opponent' as const,
      minute: Math.floor(goal.time / 60),
      scorer: goal.scorerName || 'Unknown',
      timestamp: goal.time,
      scorerId: goal.scorerId
    }))
  ].sort((a, b) => a.timestamp - b.timestamp);
  
  // Format player summaries
  const playerSummaries: PlayerSummary[] = players.map(player => {
    // Get player's play time - use totalPlayTime instead of minutesPlayed
    const totalPlaytime = player.totalPlayTime || 0;
    
    // Calculate percentage of game time
    const playtimePercentage = gameTime > 0 
      ? Math.round((totalPlaytime / gameTime) * 100) 
      : 0;
    
    // Count player's goals
    const goals = ourGoals.filter(
      goal => goal.scorerId === player.id || goal.scorerName === player.name
    ).length;
    
    return {
      id: player.id,
      name: player.name,
      totalPlaytime,
      playtimePercentage,
      goals
    };
  }).sort((a, b) => b.totalPlaytime - a.totalPlaytime);
  
  return {
    duration: gameTime,
    ourScore,
    opponentScore,
    result,
    players: playerSummaries,
    goals: allGoals,
    substitutions
  };
}

/**
 * Format minutes played for display
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export function formatMinutesPlayed(seconds: number): string {
  return formatTime(seconds);
}