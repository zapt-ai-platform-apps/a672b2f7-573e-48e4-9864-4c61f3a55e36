import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useGameTimer from '../useGameTimer';

describe('useGameTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useGameTimer());
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
    // Check that timerId is null initially, instead of undefined
    expect(result.current.isRunning).toBe(false);
  });

  it('should start the timer when startTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    // Check that we have one interval with a start time
    expect(result.current.gameIntervals.length).toBe(1);
    expect(result.current.gameIntervals[0].startTime).toBeTruthy();
    expect(result.current.gameIntervals[0].endTime).toBeUndefined();
  });

  it('should increase timeElapsed while timer is running', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    // Advance timer by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current.timeElapsed).toBe(1);
    
    // Advance timer by 5 more seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    expect(result.current.timeElapsed).toBe(6);
  });

  it('should stop the timer when stopTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    act(() => {
      result.current.stopTimer();
    });
    
    // Check that the interval has an end time
    expect(result.current.gameIntervals[0].endTime).toBeTruthy();
    
    // Advance timer by 2 more seconds, time should not change
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(result.current.timeElapsed).toBe(3);
  });

  it('should reset the timer when resetTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    act(() => {
      result.current.resetTimer();
    });
    
    expect(result.current.timeElapsed).toBe(0);
    expect(result.current.gameIntervals).toEqual([]);
  });

  it('should toggle timer state with toggleTimer', () => {
    const { result } = renderHook(() => useGameTimer());
    
    // Start timer with toggle
    act(() => {
      result.current.toggleTimer();
    });
    
    // Check timer started
    expect(result.current.gameIntervals.length).toBe(1);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    // Stop timer with toggle
    act(() => {
      result.current.toggleTimer();
    });
    
    // Check the interval has an end time
    expect(result.current.gameIntervals[0].endTime).toBeTruthy();
    
    // Time should be about 2 seconds
    expect(result.current.timeElapsed).toBe(2);
  });

  it('should clean up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    
    const { result, unmount } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    unmount();
    
    // Check clearInterval was called
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});