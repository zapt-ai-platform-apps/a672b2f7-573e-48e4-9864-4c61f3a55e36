import { describe, it, expect } from 'vitest';
import { performSubstitution } from '../../src/models/performSubstitution';

describe('Substitution Logic', () => {
  it('substitutes a player correctly', () => {
    const activePlayersList = [
      {
        id: '1',
        name: 'Player 1',
        position: 'forward',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [0],
        exitTimes: []
      }
    ];
    
    const benchPlayersList = [
      {
        id: '2',
        name: 'Player 2',
        position: 'unassigned',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [],
        exitTimes: []
      }
    ];
    
    const gameTime = 10;
    
    const result = performSubstitution(
      activePlayersList,
      benchPlayersList,
      '1',
      '2',
      gameTime
    );
    
    expect(result.updatedActivePlayers).toHaveLength(1);
    expect(result.updatedBenchPlayers).toHaveLength(1);
    expect(result.updatedActivePlayers[0].id).toBe('2');
    expect(result.updatedActivePlayers[0].position).toBe('forward');
    expect(result.updatedActivePlayers[0].entryTimes).toContain(10);
    expect(result.updatedBenchPlayers[0].id).toBe('1');
    expect(result.updatedBenchPlayers[0].exitTimes).toContain(10);
  });

  it('handles player positions correctly during substitution', () => {
    const activePlayersList = [
      {
        id: '1',
        name: 'Goalkeeper',
        position: 'goalkeeper',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [0],
        exitTimes: []
      }
    ];
    
    const benchPlayersList = [
      {
        id: '2',
        name: 'Sub Goalkeeper',
        position: 'unassigned',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [],
        exitTimes: []
      }
    ];
    
    const gameTime = 20;
    
    const result = performSubstitution(
      activePlayersList,
      benchPlayersList,
      '1',
      '2',
      gameTime
    );
    
    expect(result.updatedActivePlayers[0].position).toBe('goalkeeper');
  });

  it('correctly updates entry and exit times', () => {
    const activePlayersList = [
      {
        id: '1',
        name: 'Player 1',
        position: 'forward',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [0, 15],
        exitTimes: [10]
      }
    ];
    
    const benchPlayersList = [
      {
        id: '2',
        name: 'Player 2',
        position: 'unassigned',
        status: 'active',
        minutesPlayed: 0,
        entryTimes: [0, 5],
        exitTimes: [3, 10]
      }
    ];
    
    const gameTime = 25;
    
    const result = performSubstitution(
      activePlayersList,
      benchPlayersList,
      '1',
      '2',
      gameTime
    );
    
    expect(result.updatedActivePlayers[0].entryTimes).toEqual([0, 5, 25]);
    expect(result.updatedActivePlayers[0].exitTimes).toEqual([3, 10]);
    expect(result.updatedBenchPlayers[0].entryTimes).toEqual([0, 15]);
    expect(result.updatedBenchPlayers[0].exitTimes).toEqual([10, 25]);
  });
});