import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import StartingLineup from '../screens/GameSetup/ConfigureLineup/StartingLineup';
import { Player } from '../types/GameTypes';

// Mock hooks and navigate
const mockToggleStartingPlayer = vi.fn();
const mockNavigate = vi.fn();
const mockSetMatchSquad = vi.fn();

// Mock react-router-dom properly
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate
  };
});

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

// Mock the useStateContext hook with correct path
vi.mock('../hooks/useStateContext', () => ({
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

// Add a more specific mock for the error message component
vi.mock('../components/ErrorMessage', () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => (
    <div data-testid="error-message" className="error-message">
      {message}
    </div>
  )
}));

describe('StartingLineup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  test('renders player cards', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    // Look for player elements using a more flexible approach
    const playerElements = screen.getAllByText(/Player \d/);
    expect(playerElements.length).toBeGreaterThanOrEqual(1);
    
    // Find Player 2 by searching within specific containers
    const playerCards = screen.getAllByTestId(/player-card/i) || screen.getAllByRole('button');
    let player2Found = false;
    
    for (const card of playerCards) {
      if (card.textContent?.includes('Player 2')) {
        player2Found = true;
        break;
      }
    }
    
    expect(player2Found).toBe(true);
  });
  
  test('navigates back when back button is clicked', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  
  test('shows error when trying to continue without selecting goalkeeper', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    // Find and click the continue button
    const continueButton = screen.getByText(/Start Game/i);
    fireEvent.click(continueButton);
    
    // Look for the error message using a more flexible approach
    const errorMessages = screen.getAllByTestId('error-message');
    const selectGkMessage = errorMessages.some(
      elem => elem.textContent?.includes('select a goalkeeper')
    );
    
    expect(selectGkMessage).toBe(true);
  });
});