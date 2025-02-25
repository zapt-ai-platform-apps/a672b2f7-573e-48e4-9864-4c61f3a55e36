import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameTimer from '../../src/features/GameManagement/hooks/useGameTimer';

describe('useGameTimer Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useGameTimer());
    
    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('starts the timer when startTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    expect(result.current.isRunning).toBe(true);
    
    // Advance the timer and check time increased
    act(() => {
      vi.advanceTimersByTime(1000); // 1 second
    });
    
    expect(result.current.time).toBe(1);
  });

  it('stops the timer when stopTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
      vi.advanceTimersByTime(5000); // 5 seconds
      result.current.stopTimer();
    });
    
    expect(result.current.isRunning).toBe(false);
    
    // Time should stay the same after stopping
    const timeAfterStop = result.current.time;
    
    act(() => {
      vi.advanceTimersByTime(5000); // Another 5 seconds
    });
    
    expect(result.current.time).toBe(timeAfterStop);
  });

  it('resets the timer to 0 when resetTimer is called', () => {
    const { result } = renderHook(() => useGameTimer());
    
    act(() => {
      result.current.startTimer();
      vi.advanceTimersByTime(10000); // 10 seconds
      result.current.resetTimer();
    });
    
    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('formats time correctly using the formatTime function', () => {
    const { result } = renderHook(() => useGameTimer());
    
    expect(result.current.formatTime(0)).toBe('00:00');
    expect(result.current.formatTime(30)).toBe('00:30');
    expect(result.current.formatTime(60)).toBe('01:00');
    expect(result.current.formatTime(90)).toBe('01:30');
    expect(result.current.formatTime(3600)).toBe('60:00');
  });
});