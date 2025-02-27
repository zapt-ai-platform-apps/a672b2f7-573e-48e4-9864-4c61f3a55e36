import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { recordUserLogin } from '../recordUserLogin';
import { supabase, recordLogin as recordLoginFromClient } from '../../supabaseClient';
import { hasLoggedInRecently } from '../../lib/authRecording';

// Mock dependencies
vi.mock('../../supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  },
  recordLogin: vi.fn()
}));

vi.mock('../../lib/authRecording', () => ({
  hasLoggedInRecently: vi.fn()
}));

describe('recordUserLogin', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Default mocks
    vi.mocked(hasLoggedInRecently).mockReturnValue(false);
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { email: 'test@example.com' } },
      error: null
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should map staging environment to production', async () => {
    await recordUserLogin('user@example.com', 'staging');
    
    expect(recordLoginFromClient).toHaveBeenCalledWith('user@example.com', 'production');
  });

  it('should keep development environment unchanged', async () => {
    await recordUserLogin('user@example.com', 'development');
    
    expect(recordLoginFromClient).toHaveBeenCalledWith('user@example.com', 'development');
  });

  it('should keep production environment unchanged', async () => {
    await recordUserLogin('user@example.com', 'production');
    
    expect(recordLoginFromClient).toHaveBeenCalledWith('user@example.com', 'production');
  });

  it('should not call recordLogin if user has recently logged in', async () => {
    vi.mocked(hasLoggedInRecently).mockReturnValue(true);
    
    await recordUserLogin('user@example.com', 'development');
    
    expect(recordLoginFromClient).not.toHaveBeenCalled();
  });

  it('should fetch user email if not provided', async () => {
    await recordUserLogin(undefined, 'development');
    
    expect(supabase.auth.getUser).toHaveBeenCalled();
    expect(recordLoginFromClient).toHaveBeenCalledWith('test@example.com', 'development');
  });

  it('should not call recordLogin if no email is available', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: null
    });
    
    await recordUserLogin(undefined, 'development');
    
    expect(recordLoginFromClient).not.toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    vi.mocked(recordLoginFromClient).mockRejectedValue(new Error('API error'));
    
    // This should not throw
    await recordUserLogin('user@example.com', 'development');
    
    expect(recordLoginFromClient).toHaveBeenCalled();
  });
});