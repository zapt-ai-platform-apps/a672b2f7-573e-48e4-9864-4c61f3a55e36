import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { recordUserLogin } from '../recordUserLogin';
import { supabase, recordLogin, createEvent } from '../../supabaseClient';
import { hasLoggedInRecently } from '../../lib/authRecording';
import * as Sentry from '@sentry/browser';

// Mock dependencies
vi.mock('../../supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  },
  recordLogin: vi.fn(),
  createEvent: vi.fn()
}));

vi.mock('../../lib/authRecording', () => ({
  hasLoggedInRecently: vi.fn()
}));

vi.mock('@sentry/browser', () => ({
  captureException: vi.fn()
}));

describe('recordUserLogin', () => {
  const mockEmail = 'test@example.com';
  const mockEnvironment = 'development';
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock environment variables
    vi.stubEnv('VITE_PUBLIC_APP_ENV', 'development');
  });
  
  afterEach(() => {
    vi.unstubAllEnvs();
  });
  
  it('should record login for a new user', async () => {
    // Setup
    vi.mocked(hasLoggedInRecently).mockReturnValue(false);
    
    // Execute
    await recordUserLogin(mockEmail, mockEnvironment);
    
    // Verify
    expect(recordLogin).toHaveBeenCalledWith(mockEmail, mockEnvironment);
    expect(createEvent).toHaveBeenCalledWith('user_login', { 
      email: mockEmail, 
      environment: mockEnvironment 
    });
  });
  
  it('should fetch user email if not provided', async () => {
    // Setup
    vi.mocked(hasLoggedInRecently).mockReturnValue(false);
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { email: mockEmail } },
      error: null
    });
    
    // Execute
    await recordUserLogin(undefined, mockEnvironment);
    
    // Verify
    expect(supabase.auth.getUser).toHaveBeenCalled();
    expect(recordLogin).toHaveBeenCalledWith(mockEmail, mockEnvironment);
    expect(createEvent).toHaveBeenCalledWith('user_login', { 
      email: mockEmail, 
      environment: mockEnvironment 
    });
  });
  
  it('should map staging environment to production', async () => {
    // Setup
    vi.mocked(hasLoggedInRecently).mockReturnValue(false);
    
    // Execute
    await recordUserLogin(mockEmail, 'staging');
    
    // Verify
    expect(recordLogin).toHaveBeenCalledWith(mockEmail, 'production');
    expect(createEvent).toHaveBeenCalledWith('user_login', { 
      email: mockEmail, 
      environment: 'production' 
    });
  });
  
  it('should not record login if user has logged in recently', async () => {
    // Setup
    vi.mocked(hasLoggedInRecently).mockReturnValue(true);
    
    // Execute
    await recordUserLogin(mockEmail, mockEnvironment);
    
    // Verify
    expect(recordLogin).not.toHaveBeenCalled();
    expect(createEvent).not.toHaveBeenCalled();
  });
  
  it('should handle errors and log them to Sentry', async () => {
    // Setup
    const error = new Error('Test error');
    vi.mocked(hasLoggedInRecently).mockReturnValue(false);
    vi.mocked(recordLogin).mockRejectedValue(error);
    
    console.error = vi.fn();
    
    // Execute
    await recordUserLogin(mockEmail, mockEnvironment);
    
    // Verify
    expect(console.error).toHaveBeenCalledWith('Failed to record login:', error);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });
  
  it('should do nothing if no email is available', async () => {
    // Setup
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: null
    });
    
    // Execute
    await recordUserLogin();
    
    // Verify
    expect(recordLogin).not.toHaveBeenCalled();
    expect(createEvent).not.toHaveBeenCalled();
  });
});