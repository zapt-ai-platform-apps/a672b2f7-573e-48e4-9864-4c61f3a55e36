import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StartingLineup from '@/screens/GameSetup/ConfigureLineup/StartingLineup';
import { Player } from '@/types/GameTypes';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => vi.fn()
  };
});

// Mock the useStateContext hook
vi.mock('@/hooks/useStateContext', () => ({
  useStateContext: () => ({
    matchSquad: [
      {
        id: '1',
        name: 'Player 1',
        position: { x: 0, y: 0 },
        isOnField: true,
        isGoalkeeper: false,
        totalPlayTime: 0,
      },
      {
        id: '2',
        name: 'Player 2',
        position: { x: 0, y: 0 },
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: 0,
      }
    ]
  })
}));

describe('StartingLineup Component', () => {
  let mockOnTogglePlayer: any;
  let mockPlayers: Player[];

  beforeEach(() => {
    mockOnTogglePlayer = vi.fn();
    mockPlayers = [
      {
        id: '1',
        name: 'Player 1',
        position: { x: 0, y: 0 },
        isOnField: true,
        isGoalkeeper: false,
        totalPlayTime: 0,
        isStartingPlayer: true
      },
      {
        id: '2',
        name: 'Player 2',
        position: { x: 0, y: 0 },
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: 0,
        isStartingPlayer: false
      }
    ];
  });

  it('renders the component with players', () => {
    render(
      <BrowserRouter>
        <StartingLineup 
          players={mockPlayers} 
          onTogglePlayer={mockOnTogglePlayer}
        />
      </BrowserRouter>
    );
    
    // Check that both players are rendered
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('correctly displays starting players', () => {
    render(
      <BrowserRouter>
        <StartingLineup 
          players={mockPlayers} 
          onTogglePlayer={mockOnTogglePlayer}
        />
      </BrowserRouter>
    );
    
    // Player 1 should be in Starting section, Player 2 in Bench section
    const startingSection = screen.getByTestId('starting-players-section');
    const benchSection = screen.getByTestId('bench-players-section');
    
    expect(startingSection.textContent).toContain('Player 1');
    expect(benchSection.textContent).toContain('Player 2');
  });

  it('calls onTogglePlayer when a player is clicked', () => {
    render(
      <BrowserRouter>
        <StartingLineup 
          players={mockPlayers} 
          onTogglePlayer={mockOnTogglePlayer}
        />
      </BrowserRouter>
    );
    
    // Find and click Player 1
    const playerCards = screen.getAllByTestId('player-card');
    const player1Card = playerCards.find(card => card.textContent?.includes('Player 1'));
    
    expect(player1Card).not.toBeNull();
    expect(player1Card).toBeInTheDocument();
    
    if (player1Card) {
      fireEvent.click(player1Card);
      expect(mockOnTogglePlayer).toHaveBeenCalledWith('1');
    }
  });
});