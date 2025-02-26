import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import GameSetupStepTwo from '../screens/GameSetup/GameSetupStepTwo';
import { useStateContext } from '../hooks/useStateContext';

// Mock the context hook
vi.mock('../hooks/useStateContext');

// Mock navigate function
const mockNavigate = vi.fn();

// Mock react-router-dom with proper import technique
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe('GameSetupStepTwo', () => {
  const mockSetState = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    
    // Setup mock returns
    (useStateContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        selectedPlayers: [
          { id: '1', name: 'Player 1', selected: true },
          { id: '2', name: 'Player 2', selected: true }
        ],
        startingLineup: [],
        substitutes: [],
        goalkeeper: null
      },
      setState: mockSetState
    });
  });

  it('renders the component with players', () => {
    render(<GameSetupStepTwo />);
    expect(screen.getByText(/Configure Game/i)).toBeInTheDocument();
  });

  it('allows selecting a goalkeeper', async () => {
    render(<GameSetupStepTwo />);
    
    // Find and click goalkeeper selection
    const goalkeeperButton = screen.getByText(/Select Goalkeeper/i);
    fireEvent.click(goalkeeperButton);
    
    // Test goalkeeper selection behavior would go here
    // We'd need to simulate selection of a goalkeeper
    
    // Wait for state update
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalled();
    });
  });

  it('navigates to game management when form is submitted', async () => {
    // Setup state with all required fields
    (useStateContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        selectedPlayers: [
          { id: '1', name: 'Player 1', selected: true }
        ],
        startingLineup: [{ id: '1', name: 'Player 1', selected: true }],
        substitutes: [],
        goalkeeper: { id: '1', name: 'Player 1' }
      },
      setState: mockSetState
    });

    render(<GameSetupStepTwo />);
    
    // Find and click start game button
    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);
    
    // Verify navigation occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/game-management');
    });
  });
});