import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useGameTimer from '../useGameTimer';

describe('useGameTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGameTimer());
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
  });

  it('should start the timer correctly', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    expect(result.current.gameIntervals.length).toBe(1);
    expect(result.current.gameIntervals[0].startTime).toBeDefined();
    expect(result.current.gameIntervals[0].endTime).toBeNull();
  });

  it('should stop the timer correctly', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    vi.advanceTimersByTime(5000);
    
    act(() => {
      result.current.stopTimer();
    });
    
    expect(result.current.gameIntervals[0].endTime).toBeDefined();
  });

  it('should reset the timer correctly', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    vi.advanceTimersByTime(5000);
    
    act(() => {
      result.current.resetTimer();
    });
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
  });

  it('should calculate elapsed time correctly', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    vi.advanceTimersByTime(5000);
    
    // Allow the effect to run that updates timeElapsed
    act(() => {});
    
    expect(result.current.timeElapsed).toBe(5);
    
    act(() => {
      result.current.stopTimer();
    });
    
    vi.advanceTimersByTime(2000);
    
    // The timer is stopped, so timeElapsed should still be 5
    expect(result.current.timeElapsed).toBe(5);
    
    act(() => {
      result.current.startTimer();
    });
    
    vi.advanceTimersByTime(3000);
    
    // Allow the effect to run that updates timeElapsed
    act(() => {});
    
    // Now we should have 5 + 3 = 8 seconds
    expect(result.current.timeElapsed).toBe(8);
  });

  it('should toggle the timer correctly', () => {
    const { result } = renderHook(() => useGameTimer());
    
    // Start the timer with toggleTimer
    act(() => {
      result.current.toggleTimer();
    });
    
    expect(result.current.gameIntervals.length).toBe(1);
    expect(result.current.gameIntervals[0].endTime).toBeNull();
    
    // Stop the timer with toggleTimer
    act(() => {
      result.current.toggleTimer();
    });
    
    expect(result.current.gameIntervals[0].endTime).toBeDefined();
  });
});