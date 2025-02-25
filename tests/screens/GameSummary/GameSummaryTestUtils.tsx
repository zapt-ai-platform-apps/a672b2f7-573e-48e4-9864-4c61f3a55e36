import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StateContext } from '../../../src/context/StateContext';
import GameSummary from '../../../src/screens/GameSummary/index';
import { vi } from 'vitest';

export const mockGameState = {
  teamName: 'My Team',
  opponentName: 'Opponents',
  matchDate: '2023-05-01',
  gameLocation: 'Home Stadium',
  gameTime: 90 * 60,
  teamScore: 3,
  opponentScore: 1,
  goalsList: [
    { id: '1', playerId: '101', playerName: 'Scorer 1', time: 15 * 60, isOpponentGoal: false },
    { id: '2', playerId: '102', playerName: 'Scorer 2', time: 30 * 60, isOpponentGoal: false },
    { id: '3', playerId: '102', playerName: 'Scorer 2', time: 60 * 60, isOpponentGoal: false },
    { id: '4', playerId: 'opponent', playerName: 'Opponent', time: 75 * 60, isOpponentGoal: true }
  ],
  activePlayersList: [
    { id: '101', name: 'Player 1', position: 'forward', status: 'active', minutesPlayed: 90, entryTimes: [0], exitTimes: [] },
    { id: '102', name: 'Player 2', position: 'midfielder', status: 'active', minutesPlayed: 75, entryTimes: [0], exitTimes: [75 * 60] }
  ],
  benchPlayersList: [
    { id: '103', name: 'Player 3', position: 'defender', status: 'active', minutesPlayed: 15, entryTimes: [75 * 60], exitTimes: [] }
  ]
};

export const mockState = {
  gameState: mockGameState,
  dispatchGameAction: vi.fn()
};

export function renderWithProviders(component: React.ReactElement) {
  return render(
    <MemoryRouter>
      <StateContext.Provider value={mockState}>
        {component}
      </StateContext.Provider>
    </MemoryRouter>
  );
}

export default GameSummary;