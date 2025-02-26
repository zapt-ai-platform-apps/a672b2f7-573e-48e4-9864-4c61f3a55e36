import { renderHook, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import useGameTimer from '../../../../hooks/useGameTimer';

describe('useGameTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useGameTimer());
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
  });

  test('startTimer creates a new interval', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    expect(result.current.gameIntervals.length).toBe(1);
    expect(result.current.gameIntervals[0].start).toBeDefined();
    expect(result.current.gameIntervals[0].end).toBeUndefined();
  });

  test('stopTimer adds end time to last interval', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
      result.current.stopTimer();
    });
    
    expect(result.current.gameIntervals[0].end).toBeDefined();
  });

  test('timeElapsed increases as time passes', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    // Advance timer and check that timeElapsed increases
    act(() => {
      vi.advanceTimersByTime(5000); // 5 seconds
    });
    
    expect(result.current.timeElapsed).toBe(5);
  });

  test('resetTimer clears all state', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
      vi.advanceTimersByTime(5000);
      result.current.resetTimer();
    });
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
  });
});