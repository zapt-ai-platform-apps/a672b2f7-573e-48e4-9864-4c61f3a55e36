import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pitch from '../../src/features/GameManagement/components/Pitch';
import { StateContext } from '../../src/context/StateContext';

// Mock drag and drop functionality
vi.mock('../../src/features/GameManagement/hooks/useDragAndDrop', () => ({
  default: () => ({
    handleDragStart: vi.fn(),
    handleDragOver: vi.fn(),
    handleDrop: vi.fn(),
    draggedPlayer: null
  })
}));

describe('Pitch Component', () => {
  const mockPlayers = [
    {
      id: '1',
      name: 'John Doe',
      position: 'goalkeeper',
      status: 'active',
      minutesPlayed: 0,
      entryTimes: [0],
      exitTimes: []
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'defender',
      status: 'active',
      minutesPlayed: 0,
      entryTimes: [0],
      exitTimes: []
    },
    {
      id: '3',
      name: 'Bob Johnson',
      position: 'forward',
      status: 'active',
      minutesPlayed: 0,
      entryTimes: [0],
      exitTimes: []
    }
  ];

  const mockState = {
    gameState: {
      activePlayersList: mockPlayers,
      benchPlayersList: []
    },
    dispatchGameAction: vi.fn()
  };

  it('renders pitch with active players', () => {
    render(
      <StateContext.Provider value={mockState}>
        <Pitch />
      </StateContext.Provider>
    );
    
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Johnson/i)).toBeInTheDocument();
  });

  it('positions players in correct zones based on position', () => {
    render(
      <StateContext.Provider value={mockState}>
        <Pitch />
      </StateContext.Provider>
    );
    
    // Get player elements
    const goalkeeper = screen.getByText(/John Doe/i).closest('div[draggable="true"]');
    const defender = screen.getByText(/Jane Smith/i).closest('div[draggable="true"]');
    const forward = screen.getByText(/Bob Johnson/i).closest('div[draggable="true"]');
    
    // Check if they're in different zones
    const goalkeeperZone = goalkeeper?.parentElement;
    const defenderZone = defender?.parentElement;
    const forwardZone = forward?.parentElement;
    
    expect(goalkeeperZone).not.toBe(defenderZone);
    expect(defenderZone).not.toBe(forwardZone);
    expect(goalkeeperZone).not.toBe(forwardZone);
  });
});