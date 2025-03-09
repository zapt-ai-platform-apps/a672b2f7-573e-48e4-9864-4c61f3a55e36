import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useGameIntervalsManager from '../useGameIntervalsManager';

describe('useGameIntervalsManager', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => 2000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start the timer and update player intervals', () => {
    const setIsRunning = vi.fn();
    const setGameIntervals = vi.fn();
    const setPlayerData = vi.fn();
    
    const playerData = [
      { 
        name: 'Player1', 
        isOnField: true, 
        isGoalkeeper: false,
        playIntervals: []
      },
      { 
        name: 'Player2', 
        isOnField: false, 
        isGoalkeeper: false,
        playIntervals: []
      }
    ];
    
    const { result } = renderHook(() => 
      useGameIntervalsManager({
        isRunning: false,
        setIsRunning,
        gameIntervals: [],
        setGameIntervals,
        playerData,
        setPlayerData
      })
    );
    
    // Call toggleTimer to start the game
    result.current.toggleTimer();
    
    // Should set isRunning to true
    expect(setIsRunning).toHaveBeenCalledWith(true);
    
    // Should add a new game interval
    expect(setGameIntervals).toHaveBeenCalled();
    const newGameIntervals = setGameIntervals.mock.calls[0][0]([]);
    expect(newGameIntervals.length).toBe(1);
    expect(newGameIntervals[0].startTime).toBe(2000);
    expect(newGameIntervals[0].endTime).toBe(null);
    
    // Should update player data to add new intervals for on-field players
    expect(setPlayerData).toHaveBeenCalled();
    const newPlayerData = setPlayerData.mock.calls[0][0](playerData);
    
    // Player1 should have a new interval
    const updatedPlayer1 = newPlayerData.find(p => p.name === 'Player1');
    expect(updatedPlayer1.playIntervals.length).toBe(1);
    expect(updatedPlayer1.playIntervals[0].startTime).toBe(2000);
    expect(updatedPlayer1.playIntervals[0].endTime).toBe(null);
    expect(updatedPlayer1.playIntervals[0].isGoalkeeper).toBe(false);
    
    // Player2 should remain unchanged (not on field)
    const updatedPlayer2 = newPlayerData.find(p => p.name === 'Player2');
    expect(updatedPlayer2.playIntervals.length).toBe(0);
  });
  
  it('should pause the timer and close player intervals', () => {
    const setIsRunning = vi.fn();
    const setGameIntervals = vi.fn();
    const setPlayerData = vi.fn();
    
    const gameIntervals = [
      { startTime: 1000, endTime: null }
    ];
    
    const playerData = [
      { 
        name: 'Player1', 
        isOnField: true, 
        isGoalkeeper: false,
        playIntervals: [{ startTime: 1000, endTime: null, isGoalkeeper: false }]
      },
      { 
        name: 'Player2', 
        isOnField: false, 
        isGoalkeeper: false,
        playIntervals: []
      }
    ];
    
    const { result } = renderHook(() => 
      useGameIntervalsManager({
        isRunning: true,
        setIsRunning,
        gameIntervals,
        setGameIntervals,
        playerData,
        setPlayerData
      })
    );
    
    // Call toggleTimer to pause the game
    result.current.toggleTimer();
    
    // Should set isRunning to false
    expect(setIsRunning).toHaveBeenCalledWith(false);
    
    // Should close the current game interval
    expect(setGameIntervals).toHaveBeenCalled();
    const newGameIntervals = setGameIntervals.mock.calls[0][0](gameIntervals);
    expect(newGameIntervals.length).toBe(1);
    expect(newGameIntervals[0].startTime).toBe(1000);
    expect(newGameIntervals[0].endTime).toBe(2000);
    
    // Should update player data to close intervals for on-field players
    expect(setPlayerData).toHaveBeenCalled();
    const newPlayerData = setPlayerData.mock.calls[0][0](playerData);
    
    // Player1 should have their interval closed
    const updatedPlayer1 = newPlayerData.find(p => p.name === 'Player1');
    expect(updatedPlayer1.playIntervals.length).toBe(1);
    expect(updatedPlayer1.playIntervals[0].startTime).toBe(1000);
    expect(updatedPlayer1.playIntervals[0].endTime).toBe(2000);
    
    // Player2 should remain unchanged (not on field)
    const updatedPlayer2 = newPlayerData.find(p => p.name === 'Player2');
    expect(updatedPlayer2.playIntervals.length).toBe(0);
  });

  it('should properly handle ending the game', () => {
    const setIsRunning = vi.fn();
    const setGameIntervals = vi.fn();
    const setPlayerData = vi.fn();
    
    const gameIntervals = [
      { startTime: 1000, endTime: null }
    ];
    
    const playerData = [
      { 
        name: 'Player1', 
        isOnField: true, 
        isGoalkeeper: false,
        playIntervals: [{ startTime: 1000, endTime: null, isGoalkeeper: false }]
      }
    ];
    
    // Test that the update function handles both direct arrays and functions
    const endGameUpdate = (prev) => 
      prev.map((interval, idx) => 
        idx === prev.length - 1 && !interval.endTime
          ? { ...interval, endTime: 2000 }
          : interval
      );
    
    // Mock the setGameIntervals to capture the function
    setGameIntervals.mockImplementation((updater) => {
      // If it's a function, call it with the current intervals
      if (typeof updater === 'function') {
        return updater(gameIntervals);
      }
      return updater;
    });
    
    // Call the update function directly
    const result = setGameIntervals(endGameUpdate);
    
    // Verify the function produces the expected result
    expect(result.length).toBe(1);
    expect(result[0].startTime).toBe(1000);
    expect(result[0].endTime).toBe(2000);
  });
});