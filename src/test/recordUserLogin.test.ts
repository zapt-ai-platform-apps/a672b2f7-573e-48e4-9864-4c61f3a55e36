import { describe, expect, test, beforeEach } from 'vitest';
import { hasLoggedInRecently, clearLoginCache } from '../lib/authRecording';

describe('Auth Recording Utilities', () => {
  // Clear the login cache before each test to ensure tests are isolated
  beforeEach(() => {
    clearLoginCache();
  });

  test('hasLoggedInRecently should return false on first call for a given email', () => {
    const testEmail = 'test@example.com';
    
    // First call should return false (user has not logged in recently)
    const result = hasLoggedInRecently(testEmail);
    
    expect(result).toBe(false);
  });

  test('hasLoggedInRecently should return true on subsequent calls within timeout period', () => {
    const testEmail = 'test@example.com';
    
    // First call should return false and record the login
    hasLoggedInRecently(testEmail);
    
    // Second call should return true (user has logged in recently)
    const result = hasLoggedInRecently(testEmail);
    
    expect(result).toBe(true);
  });

  test('hasLoggedInRecently should handle different emails independently', () => {
    const firstEmail = 'first@example.com';
    const secondEmail = 'second@example.com';
    
    // First call for firstEmail
    const firstResult1 = hasLoggedInRecently(firstEmail);
    
    // First call for secondEmail
    const secondResult1 = hasLoggedInRecently(secondEmail);
    
    // Second call for firstEmail
    const firstResult2 = hasLoggedInRecently(firstEmail);
    
    // Second call for secondEmail
    const secondResult2 = hasLoggedInRecently(secondEmail);
    
    expect(firstResult1).toBe(false);
    expect(secondResult1).toBe(false);
    expect(firstResult2).toBe(true);
    expect(secondResult2).toBe(true);
  });

  test('clearLoginCache should reset the tracking state', () => {
    const testEmail = 'test@example.com';
    
    // First call should return false and record the login
    hasLoggedInRecently(testEmail);
    
    // Clear the cache
    clearLoginCache();
    
    // After clearing, should return false again
    const result = hasLoggedInRecently(testEmail);
    
    expect(result).toBe(false);
  });

  test('hasLoggedInRecently should handle empty email gracefully', () => {
    // Empty email should not cause errors and should return false
    const result = hasLoggedInRecently('');
    
    expect(result).toBe(false);
  });
});