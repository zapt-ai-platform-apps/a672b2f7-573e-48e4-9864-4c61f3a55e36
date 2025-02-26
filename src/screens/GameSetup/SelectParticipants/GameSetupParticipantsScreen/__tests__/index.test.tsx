import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GameSetupParticipantsScreen } from '../index';
import { testSetup } from './testSetup';

// Fix the import path for useMatchSquad
vi.mock('../../../../../features/GameSetup/hooks/useMatchSquad', () => ({
  __esModule: true,
  default: () => ({
    matchSquadPlayers: [
      { id: '1', name: 'Player 1', isInMatchSquad: false },
      { id: '2', name: 'Player 2', isInMatchSquad: true }
    ],
    toggleMatchPlayer: vi.fn()
  })
}));

describe('GameSetupParticipantsScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with participants', () => {
    const { container } = testSetup(<GameSetupParticipantsScreen />);
    
    expect(screen.getByText('Select Match Participants')).toBeInTheDocument();
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('displays the continue button', () => {
    testSetup(<GameSetupParticipantsScreen />);
    
    const continueButton = screen.getByText(/Continue to Setup/);
    expect(continueButton).toBeInTheDocument();
  });

  it('displays the back button', () => {
    testSetup(<GameSetupParticipantsScreen />);
    
    const backButton = screen.getByText('← Back');
    expect(backButton).toBeInTheDocument();
  });
});