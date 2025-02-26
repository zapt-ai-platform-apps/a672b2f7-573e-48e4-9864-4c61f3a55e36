import parsePlayers from '../parsePlayers';

describe('parsePlayers', () => {
  test('should correctly parse newline-separated player names', () => {
    const input = 'John\nPaul\nGeorge\nRingo';
    const result = parsePlayers(input);
    
    expect(result.length).toBe(4);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Paul');
    expect(result[2].name).toBe('George');
    expect(result[3].name).toBe('Ringo');
  });

  test('should correctly parse comma-separated player names', () => {
    const input = 'John, Paul, George, Ringo';
    const result = parsePlayers(input);
    
    expect(result.length).toBe(4);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Paul');
    expect(result[2].name).toBe('George');
    expect(result[3].name).toBe('Ringo');
  });

  test('should handle empty input', () => {
    expect(parsePlayers('')).toEqual([]);
  });

  test('should handle mixed format with preference for newlines', () => {
    const input = 'John\nPaul, George\nRingo';
    const result = parsePlayers(input);
    
    // Since there are newlines, it should split by newlines
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('John');
    expect(result[1].name).toBe('Paul, George');
    expect(result[2].name).toBe('Ringo');
  });

  test('should create player objects with default properties', () => {
    const input = 'John, Paul';
    const result = parsePlayers(input);
    
    expect(result[0]).toHaveProperty('id', '0');
    expect(result[0]).toHaveProperty('name', 'John');
    expect(result[0]).toHaveProperty('isStartingPlayer', false);
    expect(result[0]).toHaveProperty('totalPlayTime', 0);
    expect(result[0]).toHaveProperty('isOnField', false);
    expect(result[0]).toHaveProperty('isGoalkeeper', false);
    expect(result[0]).toHaveProperty('position');
    expect(result[0].position).toEqual({ x: 0, y: 0 });
  });
});