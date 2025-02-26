import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import PitchVisualization from '../features/GameManagement/components/PitchVisualization';
import { createEvent } from '@testing-library/dom';

// Mock the useDragAndDrop hook
vi.mock('../features/GameManagement/hooks/useDragAndDrop', () => {
  const mockHandlePointerDown = vi.fn();
  const mockInit = vi.fn(() => () => {});
  
  return {
    default: () => ({
      handlePointerDown: mockHandlePointerDown,
      init: mockInit
    })
  };
});

// Mock assignInitialPositions utility
vi.mock('../features/GameManagement/utils/assignInitialPositions', () => ({
  assignInitialPositions: vi.fn()
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
    const { container } = render(<PitchVisualization players={testPlayers} />);
    
    // Check for the pitch element
    const pitchElement = container.querySelector('.pitch');
    expect(pitchElement).toBeInTheDocument();
    
    // Check for player names (may be shortened based on Player component logic)
    expect(container.textContent).toContain('Player 1');
    expect(container.textContent).toContain('Player 2');
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

  it('handles player positioning with valid data', () => {
    const validPlayers = [
      { id: '3', name: 'Player 3', position: { x: 30, y: 40 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false },
      { id: '4', name: 'Player 4', position: { x: 0, y: 0 }, status: 'playing', totalPlayTime: 0, isOnField: true, isGoalkeeper: false }
    ];
    
    const { container } = render(<PitchVisualization players={validPlayers} />);
    
    // Check that all players are rendered properly
    const playerElements = container.querySelectorAll('[data-player-id]');
    expect(playerElements.length).toBe(2);
  });
});