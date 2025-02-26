import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameSetupParticipantsScreen from '../index';
import { setupTestMocks, mockToggleMatchPlayer, mockSetSelectedSquad, mockNavigate } from './testSetup';

jest.mock('../../../../../features/GameSetup/hooks/useMatchSquad', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../../../../../hooks/useStateContext', () => ({
  useStateContext: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('GameSetupParticipantsScreen', () => {
  beforeEach(() => {
    setupTestMocks(true);
  });

  test('renders valid players correctly', () => {
    render(
      <BrowserRouter>
        <GameSetupParticipantsScreen />
      </BrowserRouter>
    );
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Player 3')).toBeInTheDocument();
  });

  test('shows error message when no players are selected and Next button is clicked', () => {
    setupTestMocks(false);
    render(
      <BrowserRouter>
        <GameSetupParticipantsScreen />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Continue to Setup →'));
    expect(screen.getByText('Please select at least one participant.')).toBeInTheDocument();
  });

  test('calls setSelectedSquad and navigates when Next button is clicked with players selected', () => {
    render(
      <BrowserRouter>
        <GameSetupParticipantsScreen />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Continue to Setup →'));
    expect(mockSetSelectedSquad).toHaveBeenCalledWith([
      { id: '2', name: 'Player 2', isInMatchSquad: true, totalPlayTime: 0, isOnField: false, isGoalkeeper: false, position: { x: 0, y: 0 } }
    ]);
    expect(mockNavigate).toHaveBeenCalledWith('/next');
  });

  test('navigates back when Back button is clicked', () => {
    render(
      <BrowserRouter>
        <GameSetupParticipantsScreen />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('← Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('toggles player selection when a player card is clicked', () => {
    render(
      <BrowserRouter>
        <GameSetupParticipantsScreen />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Player 1'));
    expect(mockToggleMatchPlayer).toHaveBeenCalledWith('1');
  });
});