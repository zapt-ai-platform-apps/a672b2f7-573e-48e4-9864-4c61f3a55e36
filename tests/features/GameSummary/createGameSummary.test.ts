import { describe, it, expect } from 'vitest';
import { createGameSummary } from '../../../src/features/GameSummary/utils/createGameSummary';
import { formatTime } from '../../../src/models/timeUtils';

describe('createGameSummary', () => {
  const mockGameState = {
    teamName: 'Test Team',
    opponentName: 'Test Opponent',
    matchDate: '2023-05-15',
    gameLocation: 'Test Stadium',
    teamScore: 3,
    opponentScore: 1,
    goalsList: [
      { id: '1', playerId: '101', playerName: 'Player One', time: 10 * 60, isOpponentGoal: false },
      { id: '2', playerId: '102', playerName: 'Player Two', time: 25 * 60, isOpponentGoal: false },
      { id: '3', playerId: '101', playerName: 'Player One', time: 40 * 60, isOpponentGoal: false },
      { id: '4', playerId: 'opponent', playerName: '', time: 55 * 60, isOpponentGoal: true }
    ],
    activePlayersList: [
      { id: '101', name: 'Player One', position: 'forward', status: 'active', minutesPlayed: 90, entryTimes: [0], exitTimes: [] },
      { id: '102', name: 'Player Two', position: 'midfielder', status: 'active', minutesPlayed: 60, entryTimes: [0], exitTimes: [60 * 60] }
    ],
    benchPlayersList: [
      { id: '103', name: 'Player Three', position: 'defender', status: 'active', minutesPlayed: 30, entryTimes: [60 * 60], exitTimes: [] }
    ]
  };

  it('generates a properly formatted summary string', () => {
    const summary = createGameSummary(mockGameState);
    
    // Check for header content
    expect(summary).toContain('Match Summary: Test Team vs. Test Opponent');
    expect(summary).toContain('Date: May 15, 2023');
    expect(summary).toContain('Location: Test Stadium');
    expect(summary).toContain('Final Score: 3 - 1');
    
    // Check for goals
    expect(summary).toContain('Goals:');
    expect(summary).toContain(`Player One (${formatTime(10 * 60)})`);
    expect(summary).toContain(`Player Two (${formatTime(25 * 60)})`);
    expect(summary).toContain(`Player One (${formatTime(40 * 60)})`);
    expect(summary).toContain(`Opponent (${formatTime(55 * 60)})`);
    
    // Check for player play times
    expect(summary).toContain('Player Play Times:');
    expect(summary).toContain('Player One: 90 min');
    expect(summary).toContain('Player Two: 60 min');
    expect(summary).toContain('Player Three: 30 min');
  });

  it('handles missing location gracefully', () => {
    const gameStateWithoutLocation = { ...mockGameState, gameLocation: '' };
    const summary = createGameSummary(gameStateWithoutLocation);
    
    expect(summary).not.toContain('Location:');
  });

  it('handles no goals scenario correctly', () => {
    const gameStateWithNoGoals = { ...mockGameState, goalsList: [], teamScore: 0, opponentScore: 0 };
    const summary = createGameSummary(gameStateWithNoGoals);
    
    expect(summary).toContain('Final Score: 0 - 0');
    expect(summary).toContain('Goals: None');
  });

  it('formats date correctly', () => {
    const summary = createGameSummary(mockGameState);
    expect(summary).toContain('Date: May 15, 2023');
    
    // Test with different date format
    const gameStateWithDifferentDate = { 
      ...mockGameState, 
      matchDate: '2023-12-25' 
    };
    const summary2 = createGameSummary(gameStateWithDifferentDate);
    expect(summary2).toContain('Date: December 25, 2023');
  });

  it('formats player minutes played correctly', () => {
    const summary = createGameSummary(mockGameState);
    
    // Check that playtimes are formatted correctly
    expect(summary).toContain('Player One: 90 min');
    expect(summary).toContain('Player Two: 60 min');
    expect(summary).toContain('Player Three: 30 min');
  });
});