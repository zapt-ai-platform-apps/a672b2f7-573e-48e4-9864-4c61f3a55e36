import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameSetupStepTwo from '@/screens/GameSetup/GameSetupStepTwo';
import { Player } from '@/types/GameTypes';

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as any),
    useLocation: () => ({
      state: {
        players: [
          {
            id: '1',
            name: 'Player 1',
            position: { x: 0, y: 0 },
            isOnField: true,
            isGoalkeeper: false,
            totalPlayTime: 0,
            isInMatchSquad: true
          },
          {
            id: '2',
            name: 'Player 2',
            position: { x: 0, y: 0 },
            isOnField: false,
            isGoalkeeper: false,
            totalPlayTime: 0,
            isInMatchSquad: true
          }
        ]
      }
    }),
    useNavigate: () => vi.fn()
  };
});

// Mock hooks
vi.mock('@/hooks/useAuthSession', () => ({
  __esModule: true,
  default: () => ({
    session: { user: { id: 'test-user-id' } }
  })
}));

// Mock StateContext
vi.mock('@/hooks/useStateContext', () => ({
  useStateContext: () => ({
    matchSquad: [
      {
        id: '1',
        name: 'Player 1',
        position: { x: 0, y: 0 },
        isOnField: true,
        isGoalkeeper: true,
        totalPlayTime: 0,
        isInMatchSquad: true
      },
      {
        id: '2',
        name: 'Player 2',
        position: { x: 0, y: 0 },
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: 0,
        isInMatchSquad: true
      }
    ],
    goalkeeper: { id: '1', name: 'Player 1' },
    setPlayerData: vi.fn()
  })
}));

describe('GameSetupStepTwo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with players', () => {
    render(
      <BrowserRouter>
        <GameSetupStepTwo />
      </BrowserRouter>
    );
    
    // Check for important elements using data-testid
    expect(screen.getByTestId('configure-lineup')).toBeInTheDocument();
    expect(screen.getByTestId('player-1-text')).toBeInTheDocument();
  });

  it('displays the configure lineup title', () => {
    render(
      <BrowserRouter>
        <GameSetupStepTwo />
      </BrowserRouter>
    );
    
    // Verify the Configure Lineup text is present
    expect(screen.getByText('Configure Lineup')).toBeInTheDocument();
  });
  
  it('displays the Player 1 text element', () => {
    render(
      <BrowserRouter>
        <GameSetupStepTwo />
      </BrowserRouter>
    );
    
    // Verify Player 1 text is present (for tests)
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });
});