import { vi } from 'vitest';
import useGameSetupParticipantsHandlers from '../useGameSetupParticipantsHandlers';

describe('useGameSetupParticipantsHandlers', () => {
  const mockSetSelectedSquad = vi.fn();
  const mockNavigate = vi.fn();
  const mockSetErrorMessage = vi.fn();
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  test('handleNext should show error when no players selected', () => {
    const { handleNext } = useGameSetupParticipantsHandlers(
      [],
      mockSetSelectedSquad,
      mockNavigate,
      mockSetErrorMessage
    );
    
    handleNext();
    
    expect(mockSetErrorMessage).toHaveBeenCalledWith('Please select at least one participant.');
    expect(mockSetSelectedSquad).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('handleNext should set squad and navigate when players selected', () => {
    const selectedPlayers = [{ id: '1', name: 'Player 1', isInMatchSquad: true }];
    const { handleNext } = useGameSetupParticipantsHandlers(
      selectedPlayers as any,
      mockSetSelectedSquad,
      mockNavigate,
      mockSetErrorMessage
    );
    
    handleNext();
    
    expect(mockSetErrorMessage).not.toHaveBeenCalled();
    expect(mockSetSelectedSquad).toHaveBeenCalledWith(selectedPlayers);
    expect(mockNavigate).toHaveBeenCalledWith('/next');
  });
  
  test('handleBack should navigate back', () => {
    const { handleBack } = useGameSetupParticipantsHandlers(
      [],
      mockSetSelectedSquad,
      mockNavigate,
      mockSetErrorMessage
    );
    
    handleBack();
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});