import { vi } from 'vitest';

vi.mock('../../../../src/hooks/useStateContext', () => ({
  default: () => ({
    gameState: {
      teamName: '',
      opponentName: '',
      matchDate: '',
      gameLocation: '',
      players: []
    },
    dispatchGameAction: vi.fn()
  })
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));