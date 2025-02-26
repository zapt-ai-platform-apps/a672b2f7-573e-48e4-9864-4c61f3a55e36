import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import StartingLineup from '../screens/GameSetup/ConfigureLineup/StartingLineup';

// Mock the navigate function
const mockNavigate = vi.fn();

// Mock react-router-dom with the correct approach
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
      { id: '1', name: 'Player 1', selected: true },
      { id: '2', name: 'Player 2', selected: false }
    ],
    selectedPlayers: [{ id: '1', name: 'Player 1', selected: true }],
    toggleStartingPlayer: vi.fn(),
    clearSelectedPlayers: vi.fn()
  })
}));

// Mock the useStateContext hook
vi.mock('../hooks/useStateContext', () => ({
  useStateContext: () => ({
    matchSquad: [
      { id: '1', name: 'Player 1' },
      { id: '2', name: 'Player 2' }
    ],
    setMatchSquad: vi.fn()
  })
}));

// Mock the GoalkeeperSelect component
vi.mock('../screens/GameSetup/ConfigureLineup/GoalkeeperSelect', () => ({
  __esModule: true,
  default: () => <div data-testid="goalkeeper-select">Goalkeeper Select</div>
}));

describe('Back Button Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  test('back button calls navigate(-1)', () => {
    render(
      <BrowserRouter>
        <StartingLineup />
      </BrowserRouter>
    );
    
    const backButton = screen.getByText('← Back');
    console.log('Found back button:', backButton);
    
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});