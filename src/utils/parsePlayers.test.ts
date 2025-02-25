import { describe, it, expect } from 'vitest';
import { parsePlayers } from './parsePlayers';

describe('parsePlayers utility', () => {
  it('should split and trim player names correctly', () => {
    const input = 'John Doe, Jane Smith, Bob Johnson';
    const result = parsePlayers(input);
    
    expect(result).toEqual([
      { name: 'John Doe', isSelected: false },
      { name: 'Jane Smith', isSelected: false },
      { name: 'Bob Johnson', isSelected: false }
    ]);
  });

  it('should handle whitespace correctly', () => {
    const input = '  John Doe ,  Jane Smith  ,Bob Johnson  ';
    const result = parsePlayers(input);
    
    expect(result).toEqual([
      { name: 'John Doe', isSelected: false },
      { name: 'Jane Smith', isSelected: false },
      { name: 'Bob Johnson', isSelected: false }
    ]);
  });

  it('should handle empty input', () => {
    const input = '';
    const result = parsePlayers(input);
    
    expect(result).toEqual([]);
  });

  it('should ignore empty player names', () => {
    const input = 'John Doe, , Bob Johnson';
    const result = parsePlayers(input);
    
    expect(result).toEqual([
      { name: 'John Doe', isSelected: false },
      { name: 'Bob Johnson', isSelected: false }
    ]);
  });
});