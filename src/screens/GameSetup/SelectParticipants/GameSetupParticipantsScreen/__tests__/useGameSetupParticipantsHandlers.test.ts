import { renderHook, act } from '@testing-library/react-hooks';
import useGameSetupParticipantsHandlers from '../useGameSetupParticipantsHandlers';
import { ExtendedPlayer } from '../types';

describe('useGameSetupParticipantsHandlers', () => {
  const mockSetSelectedSquad = jest.fn();
  const mockNavigate = jest.fn();
  const mockSetErrorMessage = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('handleNext should set error message when no players are selected', () => {
    const selectedMatchPlayers: ExtendedPlayer[] = [];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedMatchPlayers,
        mockSetSelectedSquad,
        mockNavigate,
        mockSetErrorMessage
      )
    );
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(mockSetErrorMessage).toHaveBeenCalledWith('Please select at least one participant.');
    expect(mockSetSelectedSquad).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('handleNext should set selected squad and navigate when players are selected', () => {
    const selectedMatchPlayers: ExtendedPlayer[] = [
      { id: '1', name: 'Player 1', isInMatchSquad: true },
    ];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedMatchPlayers,
        mockSetSelectedSquad,
        mockNavigate,
        mockSetErrorMessage
      )
    );
    
    act(() => {
      result.current.handleNext();
    });
    
    expect(mockSetErrorMessage).not.toHaveBeenCalled();
    expect(mockSetSelectedSquad).toHaveBeenCalledWith(selectedMatchPlayers);
    expect(mockNavigate).toHaveBeenCalledWith('/next');
  });
  
  test('handleBack should navigate back', () => {
    const selectedMatchPlayers: ExtendedPlayer[] = [];
    
    const { result } = renderHook(() => 
      useGameSetupParticipantsHandlers(
        selectedMatchPlayers,
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