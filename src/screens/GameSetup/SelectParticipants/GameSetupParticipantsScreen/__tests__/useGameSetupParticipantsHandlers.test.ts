import useGameSetupParticipantsHandlers from '../useGameSetupParticipantsHandlers';
import { ExtendedPlayer } from '../types';

// Mock players with required fields
const mockPlayer1: ExtendedPlayer = {
  id: '1',
  name: 'Test Player 1',
  isInMatchSquad: true,
  totalPlayTime: 0,
  isOnField: false,
  isGoalkeeper: false,
  position: { x: 0, y: 0 }
};

const mockPlayer2: ExtendedPlayer = {
  id: '2',
  name: 'Test Player 2',
  isInMatchSquad: true,
  totalPlayTime: 0,
  isOnField: false,
  isGoalkeeper: false,
  position: { x: 0, y: 0 }
};

describe('useGameSetupParticipantsHandlers', () => {
  const setSelectedSquad = jest.fn();
  const navigate = jest.fn();
  const setErrorMessage = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('handleNext should set error when no players are selected', () => {
    const { handleNext } = useGameSetupParticipantsHandlers(
      [], 
      setSelectedSquad, 
      navigate, 
      setErrorMessage
    );
    
    handleNext();
    
    expect(setErrorMessage).toHaveBeenCalledWith('Please select at least one participant.');
    expect(setSelectedSquad).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
  
  test('handleNext should set selected squad and navigate when players are selected', () => {
    const selectedPlayers = [mockPlayer1, mockPlayer2];
    const { handleNext } = useGameSetupParticipantsHandlers(
      selectedPlayers, 
      setSelectedSquad, 
      navigate, 
      setErrorMessage
    );
    
    handleNext();
    
    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(setSelectedSquad).toHaveBeenCalledWith(selectedPlayers);
    expect(navigate).toHaveBeenCalledWith('/next');
  });
  
  test('handleBack should navigate back', () => {
    const { handleBack } = useGameSetupParticipantsHandlers(
      [], 
      setSelectedSquad, 
      navigate, 
      setErrorMessage
    );
    
    handleBack();
    
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});