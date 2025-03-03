import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameTimer from '../useGameTimer';

describe('useGameTimer', () => {
  beforeEach(() => {
    // Mock Date.now to return a fixed value
    vi.spyOn(Date, 'now').mockImplementation(() => 1000);
  });

  it('should initialize with current time', () => {
    const { result } = renderHook(() => useGameTimer({ isRunning: false, gameIntervals: [] }));
    expect(result.current.now).toBe(1000);
  });

  it('should calculate elapsed time correctly with no intervals', () => {
    const { result } = renderHook(() => useGameTimer({ isRunning: false, gameIntervals: [] }));
    expect(result.current.getTimeElapsed()).toBe(0);
  });

  it('should calculate elapsed time from completed intervals', () => {
    const gameIntervals = [
      { startTime: 500, endTime: 1000 }, // 500ms
      { startTime: 1200, endTime: 1700 }  // 500ms
    ];
    
    const { result } = renderHook(() => useGameTimer({ isRunning: false, gameIntervals }));
    expect(result.current.getTimeElapsed()).toBe(1); // 1000ms = 1s
  });

  it('should include time from active interval when running', () => {
    // Mock Date.now to return 2000
    vi.spyOn(Date, 'now').mockImplementation(() => 2000);
    
    const gameIntervals = [
      { startTime: 500, endTime: 1000 }, // 500ms
      { startTime: 1500, endTime: null }  // Will calculate using now() - startTime
    ];
    
    const { result } = renderHook(() => useGameTimer({ isRunning: true, gameIntervals }));
    
    // Initial calculation: 500ms + (2000 - 1500)ms = 1000ms = 1s
    expect(result.current.getTimeElapsed()).toBe(1);
  });
});