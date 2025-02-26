import { useMatchSquad } from '../../features/GameSetup/hooks/useMatchSquad';
import { useStateContext } from '../../hooks/useStateContext';

export const mockToggleMatchPlayer = jest.fn();
export const mockSetSelectedSquad = jest.fn();
export const mockNavigate = jest.fn();

export function setupTestMocks(defaultSelected = true) {
  jest.clearAllMocks();
  if (defaultSelected) {
    (useMatchSquad as jest.Mock).mockReturnValue({
      matchSquadPlayers: [
        { id: '1', name: 'Player 1', isInMatchSquad: false },
        { id: '2', name: 'Player 2', isInMatchSquad: true },
        { id: '3', name: 'Player 3', isInMatchSquad: false },
      ],
      toggleMatchPlayer: mockToggleMatchPlayer,
    });
  } else {
    (useMatchSquad as jest.Mock).mockReturnValue({
      matchSquadPlayers: [
        { id: '1', name: 'Player 1', isInMatchSquad: false },
        { id: '2', name: 'Player 2', isInMatchSquad: false },
        { id: '3', name: 'Player 3', isInMatchSquad: false },
      ],
      toggleMatchPlayer: mockToggleMatchPlayer,
    });
  }
  (useStateContext as jest.Mock).mockReturnValue({
    setSelectedSquad: mockSetSelectedSquad,
  });
  require('react-router-dom').useNavigate = () => mockNavigate;
}