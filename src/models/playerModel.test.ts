import { describe, it, expect } from 'vitest';
import { createPlayer, togglePlayerSelection } from './playerModel';

describe('playerModel', () => {
  describe('createPlayer', () => {
    it('should create a player with default values', () => {
      const player = createPlayer('John Doe');
      
      expect(player).toEqual({
        name: 'John Doe',
        isSelected: false,
        isOnField: false,
        isGoalkeeper: false,
        playTime: 0,
        subIn: [],
        subOut: [],
        goals: 0
      });
    });
    
    it('should override default values with provided options', () => {
      const player = createPlayer('Jane Smith', { 
        isSelected: true, 
        isGoalkeeper: true 
      });
      
      expect(player).toEqual({
        name: 'Jane Smith',
        isSelected: true,
        isOnField: false,
        isGoalkeeper: true,
        playTime: 0,
        subIn: [],
        subOut: [],
        goals: 0
      });
    });
  });
  
  describe('togglePlayerSelection', () => {
    it('should toggle a player from unselected to selected', () => {
      const player = createPlayer('John Doe');
      const toggled = togglePlayerSelection(player);
      
      expect(toggled.isSelected).toBe(true);
    });
    
    it('should toggle a player from selected to unselected', () => {
      const player = createPlayer('John Doe', { isSelected: true });
      const toggled = togglePlayerSelection(player);
      
      expect(toggled.isSelected).toBe(false);
    });
    
    it('should not modify other player properties', () => {
      const player = createPlayer('John Doe', { 
        isGoalkeeper: true,
        goals: 5
      });
      const toggled = togglePlayerSelection(player);
      
      expect(toggled).toEqual({
        ...player,
        isSelected: true
      });
    });
  });
});