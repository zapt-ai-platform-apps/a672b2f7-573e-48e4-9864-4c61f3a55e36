import { vi } from 'vitest';

export const mockProps = {
  squadName: '',
  setSquadName: vi.fn(),
  playerText: '',
  setPlayerText: vi.fn(),
  players: [],
  setPlayers: vi.fn(),
  handleSubmit: vi.fn(),
  isSubmitting: false,
  error: '',
  buttonText: 'Create Squad'
};