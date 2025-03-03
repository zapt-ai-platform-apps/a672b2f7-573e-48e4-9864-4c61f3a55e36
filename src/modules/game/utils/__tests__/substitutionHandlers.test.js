import { describe, it, expect, vi } from 'vitest';
import { makeSubstitution } from '../substitutionHandlers';

describe('substitutionHandlers', () => {
  it('should handle substitution correctly when game is running', () => {
    vi.spyOn(Date, 'now').mockImplementation(() => 2000);
    
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
    
    const setPlayerData = vi.fn();
    const updatePlayerLists = vi.fn();
    
    makeSubstitution({
      playerData,
      setPlayerData,
      selectedSubOffPlayer: playerData[0],
      selectedSubOnPlayer: playerData[1],
      isRunning: true,
      updatePlayerLists
    });
    
    // Check that setPlayerData was called with the updated players
    expect(setPlayerData).toHaveBeenCalled();
    
    // Check the modified player data
    const updatedData = setPlayerData.mock.calls[0][0](playerData);
    
    // Player1 should be off field with closed interval
    const updatedPlayer1 = updatedData.find(p => p.name === 'Player1');
    expect(updatedPlayer1.isOnField).toBe(false);
    expect(updatedPlayer1.playIntervals[0].endTime).toBe(2000);
    
    // Player2 should be on field with new interval
    const updatedPlayer2 = updatedData.find(p => p.name === 'Player2');
    expect(updatedPlayer2.isOnField).toBe(true);
    expect(updatedPlayer2.playIntervals.length).toBe(1);
    expect(updatedPlayer2.playIntervals[0].startTime).toBe(2000);
    expect(updatedPlayer2.playIntervals[0].endTime).toBe(null);
    
    // Update player lists should be called
    expect(updatePlayerLists).toHaveBeenCalled();
  });
  
  it('should handle substitution correctly when game is paused', () => {
    const playerData = [
      {
        name: 'Player1',
        isOnField: true,
        isGoalkeeper: false,
        playIntervals: [{ startTime: 1000, endTime: 1500, isGoalkeeper: false }]
      },
      {
        name: 'Player2',
        isOnField: false,
        isGoalkeeper: false,
        playIntervals: []
      }
    ];
    
    const setPlayerData = vi.fn();
    const updatePlayerLists = vi.fn();
    
    makeSubstitution({
      playerData,
      setPlayerData,
      selectedSubOffPlayer: playerData[0],
      selectedSubOnPlayer: playerData[1],
      isRunning: false,
      updatePlayerLists
    });
    
    // Check the modified player data
    const updatedData = setPlayerData.mock.calls[0][0](playerData);
    
    // Player1 should be off field without new interval changes
    const updatedPlayer1 = updatedData.find(p => p.name === 'Player1');
    expect(updatedPlayer1.isOnField).toBe(false);
    expect(updatedPlayer1.playIntervals.length).toBe(1);
    expect(updatedPlayer1.playIntervals[0].endTime).toBe(1500); // No change
    
    // Player2 should be on field but no new interval yet
    const updatedPlayer2 = updatedData.find(p => p.name === 'Player2');
    expect(updatedPlayer2.isOnField).toBe(true);
    expect(updatedPlayer2.playIntervals.length).toBe(0); // No new interval while paused
  });
  
  it('should not make substitution when players are missing', () => {
    const playerData = [
      { name: 'Player1', isOnField: true, playIntervals: [] },
      { name: 'Player2', isOnField: false, playIntervals: [] }
    ];
    
    const setPlayerData = vi.fn();
    const updatePlayerLists = vi.fn();
    
    // Try to make substitution with missing sub off player
    const result = makeSubstitution({
      playerData,
      setPlayerData,
      selectedSubOffPlayer: null,
      selectedSubOnPlayer: playerData[1],
      isRunning: true,
      updatePlayerLists
    });
    
    // Function should return false
    expect(result).toBe(false);
    // setPlayerData should not be called
    expect(setPlayerData).not.toHaveBeenCalled();
  });
});