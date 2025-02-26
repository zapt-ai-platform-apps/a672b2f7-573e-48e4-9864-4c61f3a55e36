import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GoalkeeperSelector from '../screens/GameSetup/ConfigureLineup/GoalkeeperSelector';

describe('GoalkeeperSelector', () => {
  const mockSetGoalkeeper = vi.fn();
  const mockSetConfirmedGoalkeeper = vi.fn();
  
  const startingPlayers = [
    { id: '1', name: 'Player 1' },
    { id: '2', name: 'Player 2' }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('renders the selector with players', () => {
    render(
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={null}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    // Check for select element and options
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    
    // Check for player options
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });
  
  test('selects a goalkeeper when option is changed', () => {
    render(
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={null}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    // Select player 1
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '1' } });
    
    // Check if setGoalkeeper was called with player 1
    expect(mockSetGoalkeeper).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', name: 'Player 1' })
    );
  });
  
  test('shows confirm button after selection', () => {
    render(
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={startingPlayers[0]}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    // Check if confirm button appears
    const confirmButton = screen.getByText('Confirm Goalkeeper');
    expect(confirmButton).toBeInTheDocument();
  });
  
  test('confirms goalkeeper when button is clicked', () => {
    render(
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={startingPlayers[0]}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    // Click confirm button
    const confirmButton = screen.getByText('Confirm Goalkeeper');
    fireEvent.click(confirmButton);
    
    // Check if setConfirmedGoalkeeper was called with player 1
    expect(mockSetConfirmedGoalkeeper).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', name: 'Player 1' })
    );
  });
  
  test('shows confirmation message when goalkeeper is confirmed', () => {
    render(
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={startingPlayers[0]}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={startingPlayers[0]}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    // Check for confirmation message
    expect(screen.getByText('Goalkeeper confirmed: Player 1')).toBeInTheDocument();
    
    // Confirm button should not be visible
    expect(screen.queryByText('Confirm Goalkeeper')).not.toBeInTheDocument();
  });
});