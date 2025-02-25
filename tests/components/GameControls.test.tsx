import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GameControls from '../../src/features/GameManagement/components/GameControls';
import { StateContext } from '../../src/context/StateContext';

// Mock the hooks that GameControls uses
vi.mock('../../src/hooks/useGameTimer', () => ({
  default: () => ({
    time: 1200, // 20 minutes
    isRunning: false,
    startTimer: vi.fn(),
    stopTimer: vi.fn(),
    resetTimer: vi.fn(),
    formatTime: () => '20:00'
  })
}));

vi.mock('../../src/hooks/useGameState', () => ({
  default: () => ({
    teamScore: 2,
    opponentScore: 1,
    currentInterval: 1,
    isHalfTime: false,
    isFullTime: false
  })
}));

describe('GameControls Component', () => {
  const mockState = {
    gameState: {
      teamName: 'Test Team',
      opponentName: 'Opponents',
      matchDate: '2023-05-01',
      activePlayersList: [],
      benchPlayersList: [],
      goalsList: [],
      teamScore: 2,
      opponentScore: 1,
      currentInterval: 1
    },
    dispatchGameAction: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game controls with correct team names and score', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GameControls />
      </StateContext.Provider>
    );
    
    expect(screen.getByText(/Test Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Opponents/i)).toBeInTheDocument();
    expect(screen.getByText(/2 - 1/i)).toBeInTheDocument();
  });

  it('renders timer display correctly', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GameControls />
      </StateContext.Provider>
    );
    
    expect(screen.getByText(/20:00/i)).toBeInTheDocument();
  });

  it('renders start/stop button', () => {
    render(
      <StateContext.Provider value={mockState}>
        <GameControls />
      </StateContext.Provider>
    );
    
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });
});