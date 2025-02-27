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
    
    // Check for important elements
    expect(screen.getByText(/Configure Lineup/i)).toBeInTheDocument();
    expect(screen.getByText(/Starting Lineup/i)).toBeInTheDocument();
    expect(screen.getByText(/Goalkeeper/i)).toBeInTheDocument();
  });

  it('displays players from location state', () => {
    render(
      <BrowserRouter>
        <GameSetupStepTwo />
      </BrowserRouter>
    );
    
    // Players from mocked location state should be displayed
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });
});