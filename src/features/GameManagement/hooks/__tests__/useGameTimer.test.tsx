import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
    expect(result.current.isRunning).toBe(false);
    expect(result.current.intervalId).toBeNull();
  });

  it('should start the timer when startTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    expect(result.current.isRunning).toBe(true);
    expect(result.current.intervalId).not.toBeNull();
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
    
    expect(result.current.isRunning).toBe(false);
    expect(result.current.intervalId).toBeNull();
    
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
    expect(result.current.isRunning).toBe(false);
    expect(result.current.intervalId).toBeNull();
  });

  it('should set a specific time when setTime is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.setTime(10);
    });
    
    expect(result.current.timeElapsed).toBe(10);
  });

  it('should clean up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    
    const { result, unmount } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    const intervalId = result.current.intervalId;
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalId);
  });
});