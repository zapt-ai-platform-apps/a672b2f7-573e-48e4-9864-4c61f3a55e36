import { describe, it, expect } from 'vitest';
import { createPlayer, updatePlayerStatus, updatePlayerPosition } from '../../src/models/playerModel';

describe('Player Model', () => {
  describe('createPlayer', () => {
    it('creates a player with default values', () => {
      const player = createPlayer({ name: 'John Doe' });
      
      expect(player.name).toBe('John Doe');
      expect(player.status).toBe('active');
      expect(player.position).toBe('unassigned');
      expect(player.minutesPlayed).toBe(0);
      expect(player.id).toBeDefined();
    });

    it('creates a player with provided values', () => {
      const player = createPlayer({
        name: 'Jane Smith',
        status: 'injured',
        position: 'goalkeeper',
        minutesPlayed: 10
      });
      
      expect(player.name).toBe('Jane Smith');
      expect(player.status).toBe('injured');
      expect(player.position).toBe('goalkeeper');
      expect(player.minutesPlayed).toBe(10);
    });
  });

  describe('updatePlayerStatus', () => {
    it('updates a player status', () => {
      const player = createPlayer({ name: 'John Doe' });
      const updatedPlayer = updatePlayerStatus(player, 'injured');
      
      expect(updatedPlayer.status).toBe('injured');
      expect(updatedPlayer.name).toBe('John Doe'); // Other properties remain unchanged
    });

    it('returns a new player object', () => {
      const player = createPlayer({ name: 'John Doe' });
      const updatedPlayer = updatePlayerStatus(player, 'injured');
      
      expect(updatedPlayer).not.toBe(player); // Should be a new reference
    });
  });

  describe('updatePlayerPosition', () => {
    it('updates a player position', () => {
      const player = createPlayer({ name: 'John Doe' });
      const updatedPlayer = updatePlayerPosition(player, 'goalkeeper');
      
      expect(updatedPlayer.position).toBe('goalkeeper');
      expect(updatedPlayer.name).toBe('John Doe'); // Other properties remain unchanged
    });

    it('returns a new player object', () => {
      const player = createPlayer({ name: 'John Doe' });
      const updatedPlayer = updatePlayerPosition(player, 'goalkeeper');
      
      expect(updatedPlayer).not.toBe(player); // Should be a new reference
    });
  });
});