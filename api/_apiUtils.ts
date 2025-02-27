import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  // Check if we need to bypass authentication for development/testing
  if (process.env.VITE_PUBLIC_APP_ENV === 'development' && process.env.BYPASS_AUTH === 'true') {
    return { id: 'dev-user-id', email: 'dev@example.com' };
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Invalid Authorization format');
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    console.error('Authentication error:', error);
    throw new Error('Invalid token');
  }

  return user;
}

// Optional authentication - won't throw if no auth header
export async function tryAuthenticateUser(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return null;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
      console.warn('Auth warning:', error.message);
      return null;
    }

    return user;
  } catch (error) {
    console.warn('Auth attempt failed:', error.message);
    return null;
  }
}