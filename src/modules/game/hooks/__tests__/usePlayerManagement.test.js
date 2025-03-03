import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import usePlayerManagement from '../usePlayerManagement';

describe('usePlayerManagement', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => 2000);
  });

  it('should correctly sort on-field players by playtime', () => {
    const playerData = [
      {
        name: 'Player1',
        isOnField: true,
        isGoalkeeper: false,
        playIntervals: [
          { startTime: 1000, endTime: 1500, isGoalkeeper: false }
        ]
      },
      {
        name: 'Player2',
        isOnField: true,
        isGoalkeeper: false,
        playIntervals: [
          { startTime: 1000, endTime: 1800, isGoalkeeper: false }
        ]
      }
    ];

    const { result } = renderHook(() => 
      usePlayerManagement({ 
        playerData, 
        includeGKPlaytime: true,
        isRunning: false,
        now: 2000
      })
    );

    // Player1 should come first as they have less playtime
    expect(result.current.onFieldPlayers[0].name).toBe('Player1');
    expect(result.current.onFieldPlayers[1].name).toBe('Player2');
  });

  it('should correctly exclude goalkeeper time when specified', () => {
    const playerData = [
      {
        name: 'Player1',
        isOnField: true,
        isGoalkeeper: true,
        playIntervals: [
          { startTime: 1000, endTime: 1500, isGoalkeeper: false },
          { startTime: 1500, endTime: null, isGoalkeeper: true }
        ]
      }
    ];

    const { result } = renderHook(() => 
      usePlayerManagement({ 
        playerData, 
        includeGKPlaytime: false,
        isRunning: true,
        now: 2000
      })
    );

    // Should only count the non-goalkeeper interval (500ms = 0s in integer seconds)
    expect(result.current.getTotalPlayTime(playerData[0])).toBe(0);
  });

  it('should include active interval time for on-field players when game is running', () => {
    const playerData = [
      {
        name: 'Player1',
        isOnField: true,
        isGoalkeeper: false,
        playIntervals: [
          { startTime: 1000, endTime: null, isGoalkeeper: false }
        ]
      }
    ];

    const { result } = renderHook(() => 
      usePlayerManagement({ 
        playerData, 
        includeGKPlaytime: true,
        isRunning: true,
        now: 2000
      })
    );

    // Should count 1000ms = 1s
    expect(result.current.getTotalPlayTime(playerData[0])).toBe(1);
  });
});