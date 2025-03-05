import { describe, it, expect, vi } from 'vitest';
import { createPlayerHandlers } from '../playerManagement';

describe('playerManagement', () => {
  it('should add a new player correctly', () => {
    const props = {
      playerData: [{ name: 'Player1', totalPlayTime: 100 }],
      setPlayerData: vi.fn(),
      updatePlayerLists: vi.fn()
    };
    
    const setNewPlayerName = vi.fn();
    const setShowAddPlayerModal = vi.fn();
    
    const handlers = createPlayerHandlers({
      props,
      newPlayerName: 'Player2',
      setNewPlayerName,
      setShowAddPlayerModal
    });
    
    // Test adding player using the state variable approach
    handlers.addNewPlayer();
    
    // Check that the player was added
    expect(props.setPlayerData).toHaveBeenCalled();
    expect(setNewPlayerName).toHaveBeenCalledWith('');
    expect(props.updatePlayerLists).toHaveBeenCalled();
    expect(setShowAddPlayerModal).toHaveBeenCalledWith(false);
    
    // Test adding player using the direct object approach
    handlers.addNewPlayer({
      name: 'Player3',
      playIntervals: [],
      isOnField: false,
      isGoalkeeper: false
    });
    
    // Check that the player was added
    expect(props.setPlayerData).toHaveBeenCalledTimes(2);
    expect(props.updatePlayerLists).toHaveBeenCalledTimes(2);
  });
});