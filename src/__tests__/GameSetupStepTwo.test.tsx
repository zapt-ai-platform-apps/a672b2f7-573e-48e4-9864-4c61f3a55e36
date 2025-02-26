import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import GameSetupStepTwo from '../screens/GameSetup/GameSetupStepTwo';
import { useStateContext } from '../hooks/useStateContext';

// Mock the hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../hooks/useStateContext', () => ({
  useStateContext: vi.fn(),
}));

vi.mock('@sentry/browser', () => ({
  captureException: vi.fn(),
}));

describe('GameSetupStepTwo', () => {
  const mockNavigate = vi.fn();
  const mockSetPlayerData = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });
  
  it('updates playerData and navigates to game management when valid data exists', async () => {
    // Mock match squad with a goalkeeper
    const mockMatchSquad = [
      { id: '1', name: 'Player 1', isGoalkeeper: true, isStartingPlayer: true },
      { id: '2', name: 'Player 2', isStartingPlayer: true },
      { id: '3', name: 'Player 3', isStartingPlayer: false }
    ];
    
    (useStateContext as any).mockReturnValue({
      matchSquad: mockMatchSquad,
      goalkeeper: { id: '1', name: 'Player 1' },
      setPlayerData: mockSetPlayerData
    });
    
    render(
      <MemoryRouter>
        <GameSetupStepTwo />
      </MemoryRouter>
    );
    
    // Wait for the effect to run
    await waitFor(() => {
      // Check if playerData was updated correctly
      expect(mockSetPlayerData).toHaveBeenCalledWith([
        { id: '1', name: 'Player 1', isGoalkeeper: true, isStartingPlayer: true, isOnField: true },
        { id: '2', name: 'Player 2', isStartingPlayer: true, isOnField: true },
        { id: '3', name: 'Player 3', isStartingPlayer: false, isOnField: false }
      ]);
      
      // Check if navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith('/game-management');
    });
  });
  
  it('navigates to lineup page when no goalkeeper is selected', async () => {
    // Mock match squad without a goalkeeper
    const mockMatchSquad = [
      { id: '1', name: 'Player 1', isGoalkeeper: false, isStartingPlayer: true },
      { id: '2', name: 'Player 2', isStartingPlayer: true },
    ];
    
    (useStateContext as any).mockReturnValue({
      matchSquad: mockMatchSquad,
      goalkeeper: null,
      setPlayerData: mockSetPlayerData
    });
    
    render(
      <MemoryRouter>
        <GameSetupStepTwo />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/setup/lineup');
      expect(mockSetPlayerData).not.toHaveBeenCalled();
    });
  });
  
  it('navigates to participants page when no match squad is available', async () => {
    (useStateContext as any).mockReturnValue({
      matchSquad: [],
      goalkeeper: null,
      setPlayerData: mockSetPlayerData
    });
    
    render(
      <MemoryRouter>
        <GameSetupStepTwo />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/setup/participants');
      expect(mockSetPlayerData).not.toHaveBeenCalled();
    });
  });
});