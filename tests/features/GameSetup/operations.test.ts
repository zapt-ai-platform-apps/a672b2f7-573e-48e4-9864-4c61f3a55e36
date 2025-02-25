import { describe, it, expect } from 'vitest';
import { updatePlayerSelection, updateAllPlayerStatus } from '../../../src/features/GameSetup/hooks/operations';

describe('Game Setup Operations', () => {
  it('updates player selection status correctly', () => {
    const players = [
      { id: '1', name: 'Player 1', position: 'unassigned', status: 'active', selected: false, minutesPlayed: 0 },
      { id: '2', name: 'Player 2', position: 'unassigned', status: 'active', selected: false, minutesPlayed: 0 }
    ];
    
    const result = updatePlayerSelection(players, '1');
    
    expect(result[0].selected).toBe(true);
    expect(result[1].selected).toBe(false);
  });

  it('toggles player selection status when already selected', () => {
    const players = [
      { id: '1', name: 'Player 1', position: 'unassigned', status: 'active', selected: true, minutesPlayed: 0 },
      { id: '2', name: 'Player 2', position: 'unassigned', status: 'active', selected: false, minutesPlayed: 0 }
    ];
    
    const result = updatePlayerSelection(players, '1');
    
    expect(result[0].selected).toBe(false);
    expect(result[1].selected).toBe(false);
  });

  it('updates all players status correctly', () => {
    const players = [
      { id: '1', name: 'Player 1', position: 'unassigned', status: 'active', minutesPlayed: 0 },
      { id: '2', name: 'Player 2', position: 'unassigned', status: 'injured', minutesPlayed: 0 }
    ];
    
    const result = updateAllPlayerStatus(players, 'active');
    
    expect(result[0].status).toBe('active');
    expect(result[1].status).toBe('active');
  });

  it('does not modify player objects if status is already correct', () => {
    const players = [
      { id: '1', name: 'Player 1', position: 'unassigned', status: 'active', minutesPlayed: 0 },
      { id: '2', name: 'Player 2', position: 'unassigned', status: 'active', minutesPlayed: 0 }
    ];
    
    const result = updateAllPlayerStatus(players, 'active');
    
    // Objects should be the same references if no changes were made
    expect(result[0]).toBe(players[0]);
    expect(result[1]).toBe(players[1]);
  });
});