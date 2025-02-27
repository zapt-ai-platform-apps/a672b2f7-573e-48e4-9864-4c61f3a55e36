import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GoalkeeperSelector from '@/screens/GameSetup/ConfigureLineup/GoalkeeperSelector';
import { Player } from '@/types/GameTypes';

describe('GoalkeeperSelector Component', () => {
  let mockOnSelectGoalkeeper: any;
  let mockOnUpdateIncludeGKPlaytime: any;
  let mockPlayers: Player[];
  let mockSelectedGoalkeeper: string | undefined;
  let mockIncludeGKPlaytime: boolean;

  beforeEach(() => {
    mockOnSelectGoalkeeper = vi.fn();
    mockOnUpdateIncludeGKPlaytime = vi.fn();
    mockSelectedGoalkeeper = undefined;
    mockIncludeGKPlaytime = true;
    mockPlayers = [
      {
        id: '1',
        name: 'Player 1',
        position: { x: 0, y: 0 },
        isOnField: true,
        isGoalkeeper: false,
        totalPlayTime: 0
      },
      {
        id: '2',
        name: 'Player 2',
        position: { x: 0, y: 0 },
        isOnField: true,
        isGoalkeeper: false,
        totalPlayTime: 0
      }
    ];
  });

  it('renders the component with players', () => {
    render(
      <GoalkeeperSelector 
        players={mockPlayers}
        selectedGoalkeeper={mockSelectedGoalkeeper}
        includeGKPlaytime={mockIncludeGKPlaytime}
        onSelectGoalkeeper={mockOnSelectGoalkeeper}
        onUpdateIncludeGKPlaytime={mockOnUpdateIncludeGKPlaytime}
      />
    );
    
    // Check for component title
    expect(screen.getByText(/Goalkeeper/i)).toBeInTheDocument();
    
    // Check that both players are in the dropdown options
    const selectElement = screen.getByLabelText(/Select a goalkeeper/i);
    expect(selectElement).toBeInTheDocument();
    
    // Open dropdown to check options
    fireEvent.mouseDown(selectElement);
    
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('calls onSelectGoalkeeper when a goalkeeper is selected', () => {
    render(
      <GoalkeeperSelector 
        players={mockPlayers}
        selectedGoalkeeper={mockSelectedGoalkeeper}
        includeGKPlaytime={mockIncludeGKPlaytime}
        onSelectGoalkeeper={mockOnSelectGoalkeeper}
        onUpdateIncludeGKPlaytime={mockOnUpdateIncludeGKPlaytime}
      />
    );
    
    // Open dropdown
    const selectElement = screen.getByLabelText(/Select a goalkeeper/i);
    fireEvent.mouseDown(selectElement);
    
    // Select Player 1
    const option = screen.getByText('Player 1');
    fireEvent.click(option);
    
    expect(mockOnSelectGoalkeeper).toHaveBeenCalledWith('1');
  });

  it('calls onUpdateIncludeGKPlaytime when toggle is clicked', () => {
    render(
      <GoalkeeperSelector 
        players={mockPlayers}
        selectedGoalkeeper={mockSelectedGoalkeeper}
        includeGKPlaytime={mockIncludeGKPlaytime}
        onSelectGoalkeeper={mockOnSelectGoalkeeper}
        onUpdateIncludeGKPlaytime={mockOnUpdateIncludeGKPlaytime}
      />
    );
    
    // Toggle switch should be rendered
    const toggleSwitch = screen.getByRole('checkbox');
    expect(toggleSwitch).toBeInTheDocument();
    
    // Click toggle
    fireEvent.click(toggleSwitch);
    
    expect(mockOnUpdateIncludeGKPlaytime).toHaveBeenCalledWith(false);
  });

  it('displays selected goalkeeper when provided', () => {
    mockSelectedGoalkeeper = '2';  // Player 2 is selected as goalkeeper
    
    render(
      <GoalkeeperSelector 
        players={mockPlayers}
        selectedGoalkeeper={mockSelectedGoalkeeper}
        includeGKPlaytime={mockIncludeGKPlaytime}
        onSelectGoalkeeper={mockOnSelectGoalkeeper}
        onUpdateIncludeGKPlaytime={mockOnUpdateIncludeGKPlaytime}
      />
    );
    
    // The selected value should show Player 2
    expect(screen.getByLabelText(/Select a goalkeeper/i)).toHaveTextContent('Player 2');
  });
});