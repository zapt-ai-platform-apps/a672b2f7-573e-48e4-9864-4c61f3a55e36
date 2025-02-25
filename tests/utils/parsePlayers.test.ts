import { describe, it, expect } from 'vitest';
import { parsePlayers } from '../../src/utils/parsePlayers';

describe('parsePlayers utility', () => {
  it('should parse a comma-separated list of player names', () => {
    const input = 'John Doe, Jane Smith, Tom Jones';
    const result = parsePlayers(input);
    
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('John Doe');
    expect(result[1].name).toBe('Jane Smith');
    expect(result[2].name).toBe('Tom Jones');
  });

  it('should parse a newline-separated list of player names', () => {
    const input = 'John Doe\nJane Smith\nTom Jones';
    const result = parsePlayers(input);
    
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('John Doe');
    expect(result[1].name).toBe('Jane Smith');
    expect(result[2].name).toBe('Tom Jones');
  });

  it('should trim whitespace from player names', () => {
    const input = '  John Doe ,  Jane Smith  ,Tom Jones  ';
    const result = parsePlayers(input);
    
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('John Doe');
    expect(result[1].name).toBe('Jane Smith');
    expect(result[2].name).toBe('Tom Jones');
  });

  it('should handle empty input', () => {
    const input = '';
    const result = parsePlayers(input);
    
    expect(result).toHaveLength(0);
  });

  it('should handle input with only whitespace', () => {
    const input = '   ';
    const result = parsePlayers(input);
    
    expect(result).toHaveLength(0);
  });

  it('should generate unique IDs for each player', () => {
    const input = 'John Doe, Jane Smith, Tom Jones';
    const result = parsePlayers(input);
    
    const ids = result.map(player => player.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(3); // All IDs should be unique
  });

  it('should assign default position and status to players', () => {
    const input = 'John Doe';
    const result = parsePlayers(input);
    
    expect(result[0].position).toBe('unassigned');
    expect(result[0].status).toBe('active');
    expect(result[0].minutesPlayed).toBe(0);
  });
});