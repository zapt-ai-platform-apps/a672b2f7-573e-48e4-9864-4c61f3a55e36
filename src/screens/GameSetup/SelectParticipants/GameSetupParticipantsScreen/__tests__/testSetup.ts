import { vi } from 'vitest';

export function setupTestMocks(hasPlayersSelected: boolean) {
  // In a real scenario, this function would configure the state and other mocks.
  // Here it is a no-op to simulate setup based on the boolean flag.
  return;
}

export const mockToggleMatchPlayer = vi.fn();

export const mockSetSelectedSquad = vi.fn();

export const mockNavigate = vi.fn();