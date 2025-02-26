import { renderHook, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import useGameSetupParticipantsHandlers from '../useGameSetupParticipantsHandlers';
import { ExtendedPlayer } from '../types';

// Create mock functions for dependencies
const mockSetSelectedSquad = vi.fn();
const mockNavigate = vi.fn();
const mockSetErrorMessage = vi.fn();

describe('useGameSetupParticipantsHandlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetSelectedSquad.mockClear();
    mockNavigate.mockClear();
    mockSetErrorMessage.mockClear();
  });
  
  test('should show error when no players selected', () => {
    // Empty players array
    const selectedPlayers: ExtendedPlayer[] = [];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedPlayers, 
        mockSetSelectedSquad, 
        mockNavigate, 
        mockSetErrorMessage
      )
    );
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(mockSetErrorMessage).toHaveBeenCalledWith('Please select at least one participant.');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('should navigate to next screen when players are selected', () => {
    const selectedPlayers: ExtendedPlayer[] = [
      { id: '1', name: 'Player 1', isInMatchSquad: true } as ExtendedPlayer
    ];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedPlayers, 
        mockSetSelectedSquad, 
        mockNavigate, 
        mockSetErrorMessage
      )
    );
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(mockSetSelectedSquad).toHaveBeenCalledWith(selectedPlayers);
    expect(mockNavigate).toHaveBeenCalledWith('/next');
    expect(mockSetErrorMessage).not.toHaveBeenCalled();
  });
  
  test('should navigate back when back handler is called', () => {
    const selectedPlayers: ExtendedPlayer[] = [];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedPlayers, 
        mockSetSelectedSquad, 
        mockNavigate, 
        mockSetErrorMessage
      )
    );
    
    act(() => {
      result.current.handleBack();
    });
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});