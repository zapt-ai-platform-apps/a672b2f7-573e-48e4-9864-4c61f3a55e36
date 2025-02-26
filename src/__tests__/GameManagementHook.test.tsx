import { renderHook, act } from '@testing-library/react';
import { useGameManagement } from '../hooks/useGameManagement';
import { Player } from '../types/GameTypes';

describe('useGameManagement', () => {
  const mockGoalkeeper: Player = {
    id: 'gk1',
    name: 'Goalkeeper 1',
    totalPlayTime: 0,
    isOnField: false,
    isGoalkeeper: true,
    position: { x: 0, y: 0 }
  };

  const mockPlayers: Player[] = [
    {
      id: 'p1',
      name: 'Player 1',
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      isStartingPlayer: true,
      position: { x: 0, y: 0 }
    },
    {
      id: 'p2',
      name: 'Player 2',
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      isStartingPlayer: true,
      position: { x: 0, y: 0 }
    },
    {
      id: 'p3',
      name: 'Player 3',
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      isStartingPlayer: false,
      position: { x: 0, y: 0 }
    },
  ];

  test('handleStartGame correctly sets isOnField for starting players', () => {
    const { result } = renderHook(() => useGameManagement());

    act(() => {
      result.current.handleStartGame(mockPlayers, mockGoalkeeper, true);
    });

    // Verify that isOnField is true for starting players
    expect(result.current.playerData[0].isOnField).toBe(true); // Player 1 (starting)
    expect(result.current.playerData[1].isOnField).toBe(true); // Player 2 (starting)
    expect(result.current.playerData[2].isOnField).toBe(false); // Player 3 (not starting)
    
    // Verify other game state was set correctly
    expect(result.current.goalkeeper).toBe(mockGoalkeeper);
    expect(result.current.includeGKPlaytime).toBe(true);
  });

  test('resetGame correctly resets game state', () => {
    const { result } = renderHook(() => useGameManagement());

    // First set some game data
    act(() => {
      result.current.handleStartGame(mockPlayers, mockGoalkeeper, true);
      result.current.setOurScore(2);
      result.current.setOpponentScore(1);
      result.current.setGoals([{ team: 'our', scorerName: 'Player 1', time: 300 }]);
    });

    // Then reset the game
    act(() => {
      result.current.resetGame();
    });

    // Verify game state is reset
    expect(result.current.playerData).toEqual([]);
    expect(result.current.ourScore).toBe(0);
    expect(result.current.opponentScore).toBe(0);
    expect(result.current.goals).toEqual([]);
  });
});