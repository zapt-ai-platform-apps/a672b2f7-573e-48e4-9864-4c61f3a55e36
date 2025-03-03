import { describe, it, expect, vi } from 'vitest';
import { createGoalkeeperHandlers } from '../playerGoalkeeperHandlers';

describe('playerGoalkeeperHandlers', () => {
  it('should open the goalkeeper modal when assignGoalkeeper is called', () => {
    const setShowGKModal = vi.fn();
    const setShowGKConfirmModal = vi.fn();
    
    const handlers = createGoalkeeperHandlers({}, setShowGKModal, setShowGKConfirmModal);
    
    handlers.assignGoalkeeper();
    
    expect(setShowGKModal).toHaveBeenCalledWith(true);
  });
  
  it('should update player data when confirming a new goalkeeper', () => {
    vi.spyOn(Date, 'now').mockImplementation(() => 2000);
    
    const props = {
      goalkeeper: 'OldGK',
      setGoalkeeper: vi.fn(),
      setPlayerData: vi.fn(),
      isRunning: true,
      updatePlayerLists: vi.fn(),
      onFieldPlayers: [
        { name: 'Player1', isOnField: true },
        { name: 'OldGK', isOnField: true }
      ]
    };
    
    const setShowGKModal = vi.fn();
    const setShowGKConfirmModal = vi.fn();
    
    const handlers = createGoalkeeperHandlers(props, setShowGKModal, setShowGKConfirmModal);
    
    handlers.confirmGoalkeeper('Player1');
    
    // Should set the new goalkeeper
    expect(props.setGoalkeeper).toHaveBeenCalledWith('Player1');
    
    // Should close the modals
    expect(setShowGKConfirmModal).toHaveBeenCalledWith(false);
    expect(setShowGKModal).toHaveBeenCalledWith(false);
    
    // Should update player lists
    expect(props.updatePlayerLists).toHaveBeenCalled();
    
    // Should update player data
    expect(props.setPlayerData).toHaveBeenCalled();
  });
  
  it('should return a list of available goalkeepers', () => {
    const props = {
      goalkeeper: 'CurrentGK',
      onFieldPlayers: [
        { name: 'Player1' },
        { name: 'Player2' },
        { name: 'CurrentGK' }
      ]
    };
    
    const handlers = createGoalkeeperHandlers(props, vi.fn(), vi.fn());
    
    const availableGKs = handlers.availableGoalkeepers();
    
    expect(availableGKs.length).toBe(2);
    expect(availableGKs[0].name).toBe('Player1');
    expect(availableGKs[1].name).toBe('Player2');
  });
});