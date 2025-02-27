import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PitchVisualization from '../features/GameManagement/components/PitchVisualization';
import { act } from '@testing-library/react';

// Mock useDragAndDrop hook with correct export structure
vi.mock('../features/GameManagement/hooks/useDragAndDrop', () => ({
  __esModule: true,
  default: () => ({
    handlePointerDown: vi.fn(),
    init: vi.fn(() => () => {})
  })
}));

// Mock assignInitialPositions utility
vi.mock('../features/GameManagement/utils/assignInitialPositions', () => ({
  assignInitialPositions: (players) => players
}));

describe('Pitch Visualization Drag and Drop', () => {
  const testPlayers = [
    { id: '1', name: 'Player 1', position: { x: 20, y: 30 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false },
    { id: '2', name: 'Player 2', position: { x: 40, y: 50 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders players correctly on the pitch', () => {
    const { container } = render(
      <PitchVisualization 
        players={testPlayers} 
        data-testid="pitch-container"
      />
    );
    
    // Check for the pitch element
    const pitchElement = container.querySelector('.pitch');
    expect(pitchElement).toBeInTheDocument();
    
    // Check for player elements with data-player-id attribute
    const playerElements = container.querySelectorAll('[data-player-id]');
    expect(playerElements.length).toBe(2);
    
    // Check for player names using screen query since they're in span with sr-only class
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('initializes drag and drop functionality', () => {
    const { container } = render(<PitchVisualization players={testPlayers} />);
    
    // Get the useDragAndDrop hook's init function
    const useDragAndDropModule = require('../features/GameManagement/hooks/useDragAndDrop');
    const { init } = useDragAndDropModule.default();
    
    // Verify init was called with pitch element
    expect(init).toHaveBeenCalled();
    expect(init).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('handles player positioning with valid data', async () => {
    const validPlayers = [
      { id: '3', name: 'Player 3', position: { x: 30, y: 40 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false },
      { id: '4', name: 'Player 4', position: { x: 0, y: 0 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false }
    ];
    
    await act(async () => {
      const { container } = render(<PitchVisualization players={validPlayers} />);
      
      // Check that all players are rendered properly with data-player-id attribute
      const playerElements = container.querySelectorAll('[data-player-id]');
      expect(playerElements.length).toBe(2);
    });
  });
});