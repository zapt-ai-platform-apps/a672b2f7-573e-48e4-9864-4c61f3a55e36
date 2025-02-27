/**
 * Utility module to track when users have logged in to prevent duplicate login records
 */

// Store recently logged in emails with timestamps
const recentLogins: Record<string, number> = {};

// 2 hours in milliseconds
const LOGIN_RECORD_TIMEOUT = 2 * 60 * 60 * 1000;

/**
 * Checks if a user has logged in recently (within the timeout period)
 * @param email The user's email address
 * @returns Boolean indicating if user has logged in recently
 */
export const hasLoggedInRecently = (email: string): boolean => {
  if (!email) return false;
  
  const now = Date.now();
  const lastLogin = recentLogins[email];
  
  if (lastLogin && now - lastLogin < LOGIN_RECORD_TIMEOUT) {
    return true;
  }
  
  // Update the last login time
  recentLogins[email] = now;
  return false;
};

/**
 * Clears the recent login cache for testing or when needed
 */
export const clearLoginCache = (): void => {
  Object.keys(recentLogins).forEach(key => {
    delete recentLogins[key];
  });
};