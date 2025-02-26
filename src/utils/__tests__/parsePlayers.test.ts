import { describe, it, expect } from 'vitest';
import parsePlayers from '../parsePlayers';
import { Player } from '../../types/GameTypes';

describe('parsePlayers', () => {
  it('should correctly parse player data with positions', () => {
    const playerData = [
      { id: 1, name: 'Player 1', isStartingPlayer: true },
      { id: 2, name: 'Player 2', isStartingPlayer: false }
    ];

    const result = parsePlayers(playerData);
    
    // All players should have positions, regardless of isStartingPlayer status
    expect(result.every((player: Player) => player.position && typeof player.position.x === 'number')).toBe(true);
    expect(result.every((player: Player) => player.position && typeof player.position.y === 'number')).toBe(true);
  });

  it('should assign positions even when none are provided', () => {
    const playerData = [
      { id: 1, name: 'Player 1' },
      { id: 2, name: 'Player 2' }
    ];

    const result = parsePlayers(playerData);
    
    // All players should have valid positions
    expect(result.every((player: Player) => player.position && typeof player.position.x === 'number')).toBe(true);
    expect(result.every((player: Player) => player.position && typeof player.position.y === 'number')).toBe(true);
  });

  it('should handle existing position data correctly', () => {
    const playerData = [
      { 
        id: 1, 
        name: 'Player 1', 
        position: { x: 10, y: 20 } 
      },
      { 
        id: 2, 
        name: 'Player 2', 
        position: { x: '30%', y: '40%' } 
      }
    ];

    const result = parsePlayers(playerData);
    
    // First player should keep their numeric position
    expect(result[0].position.x).toBe(10);
    expect(result[0].position.y).toBe(20);
    
    // Second player's position should be converted from strings to numbers
    expect(typeof result[1].position.x).toBe('number');
    expect(typeof result[1].position.y).toBe('number');
  });
});