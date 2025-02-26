import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import StartingLineup from '../screens/GameSetup/ConfigureLineup/StartingLineup';
import { Player } from '../types/GameTypes';

// Mock hooks and navigate
const mockToggleStartingPlayer = vi.fn();
const mockNavigate = vi.fn();
const mockSetMatchSquad = vi.fn();

// Mock the useStartingLineup hook
vi.mock('../screens/GameSetup/ConfigureLineup/StartingLineup/useStartingLineup', () => ({
  __esModule: true,
  default: () => ({
    startingPlayers: [
      { id: '1', name: 'Player 1', selected: true } as Player,
      { id: '2', name: 'Player 2', selected: false } as Player
    ],
    selectedPlayers: [{ id: '1', name: 'Player 1', selected: true } as Player],
    toggleStartingPlayer: mockToggleStartingPlayer,
    clearSelectedPlayers: vi.fn()
  })
}));

// Mock the useStateContext hook
vi.mock('../../../../hooks/useStateContext', () => ({
  useStateContext: () => ({
    matchSquad: [
      { id: '1', name: 'Player 1' } as Player,
      { id: '2', name: 'Player 2' } as Player
    ],
    setMatchSquad: mockSetMatchSquad
  })
}));

// Mock the GoalkeeperSelect component
vi.mock('../screens/GameSetup/ConfigureLineup/GoalkeeperSelect', () => ({
  __esModule: true,
  default: ({ players, goalkeeper, setGoalkeeper }: {
    players: Player[];
    goalkeeper: Player | null;
    setGoalkeeper: (player: Player | null) => void;
  }) => (
    <div data-testid="goalkeeper-select">
      <select 
        data-testid="gk-select"
        value={goalkeeper?.id || ''}
        onChange={(e) => {
          const selectedId = e.target.value;
          const player = players.find(p => p.id === selectedId);
          if (player) setGoalkeeper(player);
          else setGoalkeeper(null);
        }}
      >
        <option value="">Select GK</option>
        {players.map((p: Player) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  )
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('StartingLineup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders player cards', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    // Check for player names
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });
  
  test('navigates back when back button is clicked', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    const backButton = screen.getByText('← Back');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  
  test('shows error when trying to continue without selecting goalkeeper', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    const continueButton = screen.getByText(/Continue to Game Setup/);
    fireEvent.click(continueButton);
    expect(screen.getByText(/Please select a goalkeeper/)).toBeInTheDocument();
  });
});