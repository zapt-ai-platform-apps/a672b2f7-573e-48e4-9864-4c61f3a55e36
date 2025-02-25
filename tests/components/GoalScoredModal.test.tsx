import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GoalScoredModal from '../../src/features/GameManagement/modals/GoalScoredModal';
import { StateContext } from '../../src/context/StateContext';

describe('GoalScoredModal Component', () => {
  const mockPlayers = [
    { id: '1', name: 'Player 1', position: 'forward', status: 'active', minutesPlayed: 0 },
    { id: '2', name: 'Player 2', position: 'midfielder', status: 'active', minutesPlayed: 0 }
  ];

  const mockState = {
    gameState: {
      teamName: 'Test Team',
      activePlayersList: mockPlayers,
      benchPlayersList: [],
      gameTime: 20
    },
    dispatchGameAction: vi.fn()
  };

  const onCloseMock = vi.fn();

  it('renders the goal scored modal with player selection', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GoalScoredModal isOpen={true} onClose={onCloseMock} />
      </StateContext.Provider>
    );
    
    expect(screen.getByText(/Goal Scored!/i)).toBeInTheDocument();
    expect(screen.getByText(/Who scored the goal?/i)).toBeInTheDocument();
    
    // Check that player buttons are rendered
    expect(screen.getByText(/Player 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2/i)).toBeInTheDocument();
  });

  it('calls dispatch with the correct goal info when a player is selected', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GoalScoredModal isOpen={true} onClose={onCloseMock} />
      </StateContext.Provider>
    );
    
    // Select a player
    fireEvent.click(screen.getByText(/Player 1/i));
    
    // Check that dispatchGameAction was called
    expect(mockState.dispatchGameAction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD_GOAL',
        payload: expect.objectContaining({
          playerId: '1',
          playerName: 'Player 1',
          time: 20
        })
      })
    );
    
    // Check that onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('handles closed state correctly', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GoalScoredModal isOpen={false} onClose={onCloseMock} />
      </StateContext.Provider>
    );
    
    // Modal should not be in the document when isOpen is false
    expect(screen.queryByText(/Goal Scored!/i)).not.toBeInTheDocument();
  });
});