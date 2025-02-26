import { vi } from 'vitest';
import { render } from '@testing-library/react';

export function testSetup(component: JSX.Element) {
  return render(component);
}

export const mockToggleMatchPlayer = vi.fn();
export const mockSetSelectedSquad = vi.fn();
export const mockNavigate = vi.fn();

export function setupTestMocks(hasPlayersSelected: boolean) {
  // Clear all existing mocks
  vi.clearAllMocks();
  
  // Reset mock functions
  mockToggleMatchPlayer.mockReset();
  mockSetSelectedSquad.mockReset();
  mockNavigate.mockReset();
  
  // Setup mock returns based on the hasPlayersSelected flag
  if (!hasPlayersSelected) {
    require('../../../../../features/GameSetup/hooks/useMatchSquad').default.mockReturnValue({
      matchPlayers: [
        { id: '1', name: 'Player 1', isInMatchSquad: false, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } },
        { id: '2', name: 'Player 2', isInMatchSquad: false, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } },
        { id: '3', name: 'Player 3', isInMatchSquad: false, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } }
      ],
      selectedMatchPlayers: [],
      toggleMatchPlayer: mockToggleMatchPlayer,
      setSelectedSquad: mockSetSelectedSquad
    });
  } else {
    require('../../../../../features/GameSetup/hooks/useMatchSquad').default.mockReturnValue({
      matchPlayers: [
        { id: '1', name: 'Player 1', isInMatchSquad: false, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } },
        { id: '2', name: 'Player 2', isInMatchSquad: true, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } },
        { id: '3', name: 'Player 3', isInMatchSquad: false, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } }
      ],
      selectedMatchPlayers: [
        { id: '2', name: 'Player 2', isInMatchSquad: true, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } }
      ],
      toggleMatchPlayer: mockToggleMatchPlayer,
      setSelectedSquad: mockSetSelectedSquad
    });
  }
}