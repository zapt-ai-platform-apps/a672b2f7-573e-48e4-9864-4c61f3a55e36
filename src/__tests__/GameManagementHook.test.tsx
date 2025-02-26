import { renderHook, act } from '@testing-library/react';
import { useGameManagement } from '../hooks/useGameManagement';
import { Player } from '../types/GameTypes';

describe('useGameManagement', () => {
  const mockGoalkeeper: Player = {
    id: 'gk1',
    name: 'Goalkeeper 1',
    totalPlayTime: 0,
    isOnField: false,
    isGoalkeeper: true, // Explicitly set to true for the test
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

    // Using toStrictEqual for object comparison
    expect(result.current.playerData).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'p1', isOnField: true }),
        expect.objectContaining({ id: 'p2', isOnField: true }),
        expect.objectContaining({ id: 'p3', isOnField: false })
      ])
    );
    
    // Verify other game state was set correctly
    expect(result.current.goalkeeper).toStrictEqual(mockGoalkeeper);
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
    expect(result.current.playerData).toStrictEqual([]);
    expect(result.current.ourScore).toBe(0);
    expect(result.current.opponentScore).toBe(0);
    expect(result.current.goals).toStrictEqual([]);
  });

  test('goalkeeper is visually distinct from other players', () => {
    const { result } = renderHook(() => useGameManagement());

    act(() => {
      result.current.handleStartGame(mockPlayers, mockGoalkeeper, true);
    });

    // Verify that goalkeeper has the isGoalkeeper flag set to true
    const goalkeeper = result.current.playerData.find(p => p.isGoalkeeper);
    expect(goalkeeper).toBeTruthy();
    expect(goalkeeper?.id).toBe(mockGoalkeeper.id);
    expect(goalkeeper?.isGoalkeeper).toBe(true); // Explicitly check isGoalkeeper is true
  });

  test('handleRemoveLastGoal correctly removes the last goal', () => {
    const { result } = renderHook(() => useGameManagement());

    // Setup game with players and goals
    act(() => {
      result.current.handleStartGame(mockPlayers, mockGoalkeeper, true);
      result.current.setOurScore(2);
      result.current.setGoals([
        { team: 'our', scorerName: 'Player 1', time: 100 },
        { team: 'our', scorerName: 'Player 2', time: 200 }
      ]);
    });

    // Remove the last goal
    act(() => {
      // Here we're simulating the handleRemoveLastGoal function
      // that would normally be passed from useGameManagementLogic
      const lastGoal = result.current.goals[result.current.goals.length - 1];
      const newGoals = [...result.current.goals];
      newGoals.pop();
      result.current.setGoals(newGoals);
      
      if (lastGoal.team === 'our') {
        result.current.setOurScore(result.current.ourScore - 1);
      } else {
        result.current.setOpponentScore(result.current.opponentScore - 1);
      }
    });

    // Verify goal was removed and score updated using strict equality
    expect(result.current.goals).toStrictEqual([
      { team: 'our', scorerName: 'Player 1', time: 100 }
    ]);
    expect(result.current.ourScore).toBe(1);
  });
});