import { describe, it, expect, vi, beforeEach } from 'vitest';
import { recordUserLogin } from '../recordUserLogin';
import * as supabaseClient from '../../supabaseClient';

// Mock the supabaseClient module
vi.mock('../../supabaseClient', () => ({
  recordLogin: vi.fn(),
  createEvent: vi.fn(),
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  }
}));

// Create a full user object that matches Supabase User type
const fullUser = {
  id: 'user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2023-01-01T00:00:00Z'
};

describe('recordUserLogin utility', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    vi.clearAllMocks();
    
    // Set up default mock with complete user object
    vi.mocked(supabaseClient.supabase.auth.getUser).mockResolvedValue({
      data: { user: fullUser },
      error: null
    });
  });

  it('should call recordLogin with the correct parameters', async () => {
    // Set the environment variable value
    vi.stubEnv('VITE_PUBLIC_APP_ENV', 'test-environment');

    // Call the function to test
    await recordUserLogin();

    // Check that recordLogin was called with the correct parameters
    expect(supabaseClient.recordLogin).toHaveBeenCalledWith(
      'test@example.com', 
      'test-environment'
    );
  });

  it('should call createEvent after successful login recording', async () => {
    // Mock recordLogin to resolve successfully
    vi.mocked(supabaseClient.recordLogin).mockResolvedValue(undefined);

    // Call the function to test
    await recordUserLogin();

    // Check that createEvent was called after recordLogin
    expect(supabaseClient.createEvent).toHaveBeenCalledTimes(1);
  });

  it('should not call recordLogin if user email is not available', async () => {
    // Mock the supabase.auth.getUser response with a user that has no email
    const userWithoutEmail = { ...fullUser, email: undefined };
    vi.mocked(supabaseClient.supabase.auth.getUser).mockResolvedValue({
      data: { user: userWithoutEmail },
      error: null
    });

    // Call the function to test
    await recordUserLogin();

    // Check that recordLogin was not called
    expect(supabaseClient.recordLogin).not.toHaveBeenCalled();
    expect(supabaseClient.createEvent).not.toHaveBeenCalled();
  });

  it('should handle null user gracefully', async () => {
    // Mock the supabase.auth.getUser response with null user (using type casting)
    vi.mocked(supabaseClient.supabase.auth.getUser).mockResolvedValue({
      data: { user: null as any },
      error: null
    });

    // Call the function to test
    await recordUserLogin();

    // Check that recordLogin was not called
    expect(supabaseClient.recordLogin).not.toHaveBeenCalled();
    expect(supabaseClient.createEvent).not.toHaveBeenCalled();
  });

  it('should handle auth errors gracefully', async () => {
    // Mock the supabase.auth.getUser to throw an error
    vi.mocked(supabaseClient.supabase.auth.getUser).mockRejectedValue(
      new Error('Auth error')
    );

    // Call the function to test
    await recordUserLogin();

    // Check that recordLogin was not called
    expect(supabaseClient.recordLogin).not.toHaveBeenCalled();
    expect(supabaseClient.createEvent).not.toHaveBeenCalled();
  });

  it('should handle recordLogin errors gracefully', async () => {
    // Mock recordLogin to throw an error
    vi.mocked(supabaseClient.recordLogin).mockRejectedValue(
      new Error('Failed to record login')
    );

    // Call the function to test
    await recordUserLogin();

    // Check that createEvent was not called after recordLogin failed
    expect(supabaseClient.createEvent).not.toHaveBeenCalled();
  });

  it('should log errors to console but not crash the application', async () => {
    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock recordLogin to throw an error
    vi.mocked(supabaseClient.recordLogin).mockRejectedValue(
      new Error('Login recording failed')
    );

    // Call the function and ensure it doesn't throw
    await expect(recordUserLogin()).resolves.not.toThrow();
    
    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});