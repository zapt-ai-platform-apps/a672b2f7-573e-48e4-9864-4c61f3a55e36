import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import GoalkeeperSelector from '../screens/GameSetup/ConfigureLineup/GoalkeeperSelector';
import { Player } from '../screens/GameSetup/ConfigureLineup/GoalkeeperTypes';

describe('GoalkeeperSelector', () => {
  const mockSetGoalkeeper = vi.fn();
  const mockSetConfirmedGoalkeeper = vi.fn();
  
  const startingPlayers: Player[] = [
    { id: '1', name: 'Player 1' },
    { id: '2', name: 'Player 2' },
    { id: '3', name: 'Player 3' }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('renders without goalkeeper selected', () => {
    render(
      <GoalkeeperSelector 
        startingPlayers={startingPlayers}
        goalkeeper={null}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    expect(screen.getByText('Select Goalkeeper')).toBeInTheDocument();
    expect(screen.getByText('Select a player')).toBeInTheDocument();
    expect(screen.getByText('No goalkeeper confirmed yet')).toBeInTheDocument();
  });
  
  test('displays all available players in dropdown', () => {
    render(
      <GoalkeeperSelector 
        startingPlayers={startingPlayers}
        goalkeeper={null}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Player 3')).toBeInTheDocument();
  });
  
  test('calls setGoalkeeper when player is selected', () => {
    render(
      <GoalkeeperSelector 
        startingPlayers={startingPlayers}
        goalkeeper={null}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(mockSetGoalkeeper).toHaveBeenCalledWith(startingPlayers[1]);
  });
  
  test('shows confirm button when goalkeeper is selected but not confirmed', () => {
    render(
      <GoalkeeperSelector 
        startingPlayers={startingPlayers}
        goalkeeper={startingPlayers[0]}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    expect(screen.getByText('Confirm Goalkeeper')).toBeInTheDocument();
  });
  
  test('calls setConfirmedGoalkeeper when confirm button is clicked', () => {
    render(
      <GoalkeeperSelector 
        startingPlayers={startingPlayers}
        goalkeeper={startingPlayers[0]}
        setGoalkeeper={mockSetGoalkeeper}
        confirmedGoalkeeper={null}
        setConfirmedGoalkeeper={mockSetConfirmedGoalkeeper}
      />
    );
    
    const confirmButton = screen.getByText('Confirm Goalkeeper');
    fireEvent.click(confirmButton);
    
    expect(mockSetConfirmedGoalkeeper).toHaveBeenCalledWith(startingPlayers[0]);
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
    
    expect(screen.getByText('Goalkeeper confirmed: Player 1')).toBeInTheDocument();
    expect(screen.queryByText('Confirm Goalkeeper')).not.toBeInTheDocument();
  });
});