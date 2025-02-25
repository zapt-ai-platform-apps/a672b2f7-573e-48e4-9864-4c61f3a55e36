import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSquads, createSquad, updateSquad, deleteSquad } from '../../src/features/SquadManagement/services/squadServiceApi';

global.fetch = vi.fn();

describe('Squad Service API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls fetch with correct parameters when fetching squads', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([{ id: '1', name: 'Squad 1' }])
    };

    (global.fetch as any).mockResolvedValue(mockResponse);

    const mockSession = { access_token: 'test-token' };
    const result = await fetchSquads(mockSession);

    expect(global.fetch).toHaveBeenCalledWith('/api/squads', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json'
      }
    });

    expect(result).toEqual([{ id: '1', name: 'Squad 1' }]);
  });

  it('calls fetch with correct parameters when creating a squad', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ id: '1', name: 'New Squad' })
    };

    (global.fetch as any).mockResolvedValue(mockResponse);

    const mockSession = { access_token: 'test-token' };
    const mockSquad = {
      name: 'New Squad',
      players: [{ name: 'Player 1', position: 'unassigned', status: 'active', minutesPlayed: 0 }]
    };

    const result = await createSquad(mockSquad, mockSession);

    expect(global.fetch).toHaveBeenCalledWith('/api/squads', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockSquad)
    });

    expect(result).toEqual({ id: '1', name: 'New Squad' });
  });

  it('calls fetch with correct parameters when updating a squad', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ id: '1', name: 'Updated Squad' })
    };

    (global.fetch as any).mockResolvedValue(mockResponse);

    const mockSession = { access_token: 'test-token' };
    const mockSquad = {
      id: '1',
      name: 'Updated Squad',
      players: [{ name: 'Player 1', position: 'unassigned', status: 'active', minutesPlayed: 0 }]
    };

    const result = await updateSquad(mockSquad, mockSession);

    expect(global.fetch).toHaveBeenCalledWith('/api/squads', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockSquad)
    });

    expect(result).toEqual({ id: '1', name: 'Updated Squad' });
  });

  it('calls fetch with correct parameters when deleting a squad', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true })
    };

    (global.fetch as any).mockResolvedValue(mockResponse);

    const mockSession = { access_token: 'test-token' };

    const result = await deleteSquad('1', mockSession);

    expect(global.fetch).toHaveBeenCalledWith('/api/squads?id=1', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json'
      }
    });

    expect(result).toEqual({ success: true });
  });

  it('handles fetch errors correctly', async () => {
    const mockError = new Error('Network error');
    (global.fetch as any).mockRejectedValue(mockError);

    const mockSession = { access_token: 'test-token' };

    await expect(fetchSquads(mockSession)).rejects.toThrow('Network error');
  });

  it('handles non-ok responses correctly', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found'
    };

    (global.fetch as any).mockResolvedValue(mockResponse);

    const mockSession = { access_token: 'test-token' };

    await expect(fetchSquads(mockSession)).rejects.toThrow('HTTP error! Status: 404 Not Found');
  });
});